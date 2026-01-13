import { Inject, Injectable } from "@nestjs/common";
import type { Card } from "../../domain/cards/card.value-object";
import type { SevenWondersGameRepository } from "../../domain/game-repository";
import type { Player } from "../../domain/player.entity";
import type { Resource } from "../../domain/resource";
import {
	type CardsInMyHandsReadmodel,
	notPlayable,
	playable,
	playableWithPayment,
	type TransactionCombination,
} from "./cards-in-my-hands-readmodel";

const RESOURCE_PURCHASE_COST = 2;

@Injectable()
export class GetCardsInMyHandsReadModel {
	constructor(
		@Inject("SevenWondersGameRepository")
		private sevenWonderGameRepository: SevenWondersGameRepository,
	) {}

	async read(
		gameId: string,
		playerName: string,
	): Promise<CardsInMyHandsReadmodel> {
		const game = await this.sevenWonderGameRepository.findById(gameId);
		if (!game) {
			return { cards: [] };
		}

		const askedPlayer = game.players.find(
			(player: Player) =>
				player.name.toLowerCase() === playerName.toLowerCase(),
		);
		if (!askedPlayer) {
			return { cards: [] };
		}

		const neighbours = game.getNeighbours(askedPlayer);
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
					playability,
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
	const requiredResources = card.resourcesCostMap();
	const playerResources = player.getResources();
	const missingResources = remainingRequiredResources(
		requiredResources,
		playerResources,
	);

	const thereIsNoMissingResources =
		Array.from(missingResources.values()).reduce((sum, qty) => sum + qty, 0) ===
		0;
	if (thereIsNoMissingResources) {
		if (player.coins < card.coinsCost) {
			return notPlayable();
		}
		return playable();
	}

	const possibleCombinations = generateAllCombinations(
		neighbours,
		missingResources,
	);

	const payablePossibleCombinations = possibleCombinations.filter(
		(transactionCombination) => {
			const costOfTransactionCombination = transactionCombination
				.map((transaction) => transaction.cost)
				.reduce((sum, cost) => sum + cost, 0);
			return costOfTransactionCombination <= player.coins;
		},
	);

	if (payablePossibleCombinations.length === 0) {
		return notPlayable();
	}

	return playableWithPayment(payablePossibleCombinations);
};

const generateAllCombinations = (
	neighbours: Player[],
	missingResources: Map<Resource, number>,
): TransactionCombination[] => {
	const combinations: { playerName: string; cost: number }[][] = [];
	const resourcesList: Resource[] = [];

	missingResources.forEach((quantity, resource) => {
		for (let i = 0; i < quantity; i++) {
			resourcesList.push(resource);
		}
	});

	const distributeResources = (
		resourceIndex: number,
		currentDistribution: Map<string, Resource[]>,
	) => {
		if (resourceIndex >= resourcesList.length) {
			const combination: { playerName: string; cost: number }[] = [];
			currentDistribution.forEach((resources, playerName) => {
				if (resources.length > 0) {
					combination.push({
						playerName,
						cost: resources.length * RESOURCE_PURCHASE_COST,
					});
				}
			});
			if (combination.length > 0) {
				const normalizedCombination = combination.sort((a, b) =>
					a.playerName.localeCompare(b.playerName),
				);
				const isDuplicate = combinations.some((existing) =>
					areCombinationsEqual(existing, normalizedCombination),
				);
				if (!isDuplicate) {
					combinations.push(normalizedCombination);
				}
			}
			return;
		}

		const currentResource = resourcesList[resourceIndex];

		for (const neighbour of neighbours) {
			const neighbourResources = neighbour.getResources();
			const availableQuantity = neighbourResources.get(currentResource) ?? 0;
			const alreadyAssigned =
				currentDistribution
					.get(neighbour.name)
					?.filter((r) => r === currentResource).length ?? 0;

			if (availableQuantity > alreadyAssigned) {
				const newDistribution = new Map(currentDistribution);
				const neighbourResourcesInDistribution =
					newDistribution.get(neighbour.name) ?? [];
				newDistribution.set(neighbour.name, [
					...neighbourResourcesInDistribution,
					currentResource,
				]);

				distributeResources(resourceIndex + 1, newDistribution);
			}
		}
	};

	distributeResources(0, new Map<string, Resource[]>());

	return combinations;
};

const areCombinationsEqual = (
	combo1: TransactionCombination,
	combo2: TransactionCombination,
): boolean => {
	if (combo1.length !== combo2.length) {
		return false;
	}

	return combo1.every(
		(item, index) =>
			item.playerName === combo2[index].playerName &&
			item.cost === combo2[index].cost,
	);
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
