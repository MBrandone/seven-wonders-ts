import type { Card } from "../../domain/cards/card.value-object";
import { CardType } from "../../domain/cards/card-type";
import type { SevenWondersGameRepository } from "../../domain/game-repository";
import type { Player } from "../../domain/player.entity";
import { Resource } from "../../domain/resource";

type Playable = "YES" | "NO" | "WITH_PAYMENT";

type CardsInMyHandsReadmodel = {
	cards: {
		name: string;
		type: string;
		playable: Playable;
		costToPlay: { playerName: string; cost: number }[];
	}[];
};

import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class GetCardsInMyHandsReadModel {
	constructor(@Inject("SevenWondersGameRepository") private sevenWonderGameRepository: SevenWondersGameRepository) {}

    async read(
		gameId: string,
		playerName: string,
	): Promise<CardsInMyHandsReadmodel> {
		const game = await this.sevenWonderGameRepository.findById(gameId);
		if (!game) {
			return { cards: [] };
		}
		
		const askedPlayer = game.players.find((player: Player) => player.name.toLowerCase() === playerName.toLowerCase());
		if (!askedPlayer) {
			return { cards: [] };
		}

		const neighbours = game.getNeighbours(askedPlayer)
		const cards = askedPlayer.cards;

		return {
			cards: cards.map((card: Card) => {
				const playability = resolveCardPlayability(
					card,
					askedPlayer,
					neighbours,
				);
				return {
					name: card.name,
					type: card.type,
					playable: playability.playable,
					costToPlay: playability.costToPlay,
				};
			}),
		};
	}
}

const resolveCardPlayability = (
	card: Card,
	player: Player,
	neighbours: Player[],
) => {
	const requiredResources = countResources(card.resourcesCost);
	const coinCost = card.coinsCost;
	const playerCoins = player.coins;

	const playerResources = resourcesOfPlayer(player);
	const missingResources = remainingRequiredResources(
		requiredResources,
		playerResources,
	);

    // Le joueur a les ressources nécessaires
	if (totalCount(missingResources) === 0) {
		if (playerCoins < coinCost) {
			return { playable: "NO" as Playable, costToPlay: [] };
		}
		return { playable: "YES" as Playable, costToPlay: [] };
	}

    // On cherche les ressources manquantes parmi les voisins
	const neighboursStocks = neighbours.map((neighbour) => ({
		player: neighbour,
		available: resourcesOfPlayer(neighbour),
		purchased: 0,
	}));

	missingResources.forEach((quantityNeeded, resource) => {
		let remainingQuantity = quantityNeeded;
		for (const neighbour of neighboursStocks) {
			if (remainingQuantity === 0) break;
			const availableQuantity = neighbour.available.get(resource) ?? 0;
			if (availableQuantity > 0) {
				const quantityToBuy = Math.min(availableQuantity, remainingQuantity);
				neighbour.available.set(resource, availableQuantity - quantityToBuy);
				neighbour.purchased += quantityToBuy;
				remainingQuantity -= quantityToBuy;
			}
		}
		if (remainingQuantity > 0) {
			missingResources.set(resource, remainingQuantity);
		} else {
			missingResources.delete(resource);
		}
	});

    // Les voisins n'ont pas les ressources nécessaires
	if (missingResources.size > 0) {
		return { playable: "NO" as Playable, costToPlay: [] };
	}

    // On calcule les coûts de ressources achetées par les voisins
	const neighbourPayments = neighboursStocks
		.filter((entry) => entry.purchased > 0)
		.map((entry) => ({
			playerName: entry.player.name,
			cost: entry.purchased * RESOURCE_PURCHASE_COST,
		}));

	const purchasedResources = neighboursStocks.reduce(
		(total, entry) => total + entry.purchased,
		0,
	);
	const totalCoinCost = coinCost + purchasedResources * RESOURCE_PURCHASE_COST;

    // Le joueur ne peut pas payer
	if (playerCoins < totalCoinCost) {
		return { playable: "NO" as Playable, costToPlay: [] };
	}

    // On détermine le statut de jouabilité
	const playableStatus: Playable =
		purchasedResources > 0 ? "WITH_PAYMENT" : "YES";
	return { playable: playableStatus, costToPlay: neighbourPayments };
};

const getResourcesProducedByCard = (card: Card): Resource[] => {
	const resources: Resource[] = [];
	
	// Les cartes RAW_MATERIAL produisent leur ressource de base selon leur nom
	if (card.type === CardType.RAW_MATERIAL) {
		if (card.name.includes("Chantier") || card.name.includes("Exploitation Forestière") || card.name.includes("Scierie")) {
			resources.push(Resource.BOIS);
		} else if (card.name.includes("Cavité") || card.name.includes("Carrière")) {
			resources.push(Resource.PIERRE);
		} else if (card.name.includes("Bassin Argileux") || card.name.includes("Fosse Argileuse") || card.name.includes("Briquetterie")) {
			resources.push(Resource.ARGILE);
		} else if (card.name.includes("Filon") || card.name.includes("Gisement") || card.name.includes("Mine") || card.name.includes("Fonderie")) {
			resources.push(Resource.MINERAI);
		}
	}
	
	if (card.type === CardType.MANUFACTURED_GOOD) {
		if (card.name.includes("Verrerie")) {
			resources.push(Resource.VERRE);
		} else if (card.name.includes("Presse")) {
			resources.push(Resource.PAPYRUS);
		} else if (card.name.includes("Métier à Tisser")) {
			resources.push(Resource.TISSU);
		}
	}
	
	return resources;
};

const RESOURCE_PURCHASE_COST = 2;

const countResources = (resources: Resource[]) => {
	return resources.reduce<Map<Resource, number>>((acc, resource) => {
		acc.set(resource, (acc.get(resource) ?? 0) + 1);
		return acc;
	}, new Map<Resource, number>());
};

const remainingRequiredResources = (
	required: Map<Resource, number>,
	available: Map<Resource, number>,
) => {
	const missing = new Map<Resource, number>();
	required.forEach((qty, resource) => {
		const diff = qty - (available.get(resource) ?? 0);
		if (diff > 0) {
			missing.set(resource, diff);
		}
	});
	return missing;
};

const totalCount = (entries: Map<Resource, number>) =>
	Array.from(entries.values()).reduce((sum, qty) => sum + qty, 0);

const resourcesOfPlayer = (player: Player): Map<Resource, number> => {
	const resources: Resource[] = [];
	const explicitResources = (player as unknown as { resources?: Resource[] })
		.resources;
	if (explicitResources) {
		resources.push(...explicitResources);
	}
	if (player.wonder?.baseResource) {
		resources.push(player.wonder.baseResource);
	}
	player.board.forEach((card: Card) => {
		const produces = getResourcesProducedByCard(card);
		resources.push(...produces);
	});
	return countResources(resources);
};

