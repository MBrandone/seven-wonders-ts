import {
	aqueduc1,
	bains1,
	jardins1,
	theatre1,
} from "../../domain/cards/all-cards/civilian";
import {
	bazar1,
	caravanserail1,
	caravanserail3,
	chambreDeCommerce1,
	comptoirOuest1,
	forum1,
	ludus1,
	marche1,
	phare2,
	port1,
	taverne1,
	taverne2,
	vignoble1,
} from "../../domain/cards/all-cards/commercial";
import {
	guildeDesArmateurs1,
	guildeDesArtisans1,
	guildeDesCommercants1,
	guildeDesEspions1,
	guildeDesMagistrats1,
	guildeDesPhilosophes1,
	guildeDesTravailleurs1,
} from "../../domain/cards/all-cards/guild";
import {
	metierATisser2,
	presse1,
	presse2,
	verrerie1,
	verrerie2,
} from "../../domain/cards/all-cards/manufactured-good";
import {
	arsenal1,
	caserne1,
	ecuries1,
	fortifications2,
	palissade1,
} from "../../domain/cards/all-cards/military";
import {
	bassinArgileux1,
	cavite1,
	chantier1,
	excavation,
	filon1,
	filon2,
	fosseArgileuse,
	friche,
} from "../../domain/cards/all-cards/raw-material-cards";
import {
	dispensaire1,
	etude1,
	scriptorium1,
	universite1,
	universite2,
} from "../../domain/cards/all-cards/science";
import { buildPlayer } from "../../domain/player.entity";
import { SevenWondersGame } from "../../domain/seven-wonders-game";
import { PointCalculatorService } from "./point-calculator.service";

describe("PointCalculator", () => {
	describe("Commercial Points", () => {
		describe("La taverne, les comptoirs, les caravanserail, le forum, le bazar, le marché et le vignoble", () => {
			it("ne rapporte aucun point", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [
						taverne1,
						comptoirOuest1,
						caravanserail1,
						bazar1,
						forum1,
						marche1,
						vignoble1,
					],
				});

				// When
				const commercialPoints =
					new PointCalculatorService().calculateCommercialPoints(player);

				// Then
				expect(commercialPoints).toBe(0);
			});
		});

		describe("Le port", () => {
			it("rapporte autant de point que le joueur ne possède de carte Resource", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [port1, chantier1, cavite1, bassinArgileux1],
				});

				// When
				const commercialPoints =
					new PointCalculatorService().calculateCommercialPoints(player);

				// Then
				expect(commercialPoints).toBe(3);
			});
		});

		describe("La chambre de commerce", () => {
			it("rapporte 2 points carte Resource Manufacturé", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [
						chambreDeCommerce1,
						chantier1,
						verrerie1,
						bassinArgileux1,
						presse1,
					],
				});

				// When
				const commercialPoints =
					new PointCalculatorService().calculateCommercialPoints(player);

				// Then
				expect(commercialPoints).toBe(4);
			});
		});

		describe("Le phare", () => {
			it("rapporte 1 point par carte commercial possédé", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [phare2, ludus1, port1, forum1, comptoirOuest1],
				});

				// When
				const commercialPoints =
					new PointCalculatorService().calculateCommercialPoints(player);

				// Then
				expect(commercialPoints).toBe(5);
			});
		});

		describe("L'arène", () => {
			it.todo("rapporte un point par stage de merveille construit");
		});

		describe("Le Ludus", () => {
			it("rapporte 1 point par carte militaire possédée", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [ludus1, arsenal1, fortifications2],
				});

				// When
				const commercialPoints =
					new PointCalculatorService().calculateCommercialPoints(player);

				// Then
				expect(commercialPoints).toBe(2);
			});
		});
	});

	describe("Guild points", () => {
		describe("La guilde des travailleurs", () => {
			it("rapporte autant de points que les voisins ont de cartes ressources", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [
						guildeDesTravailleurs1,
						filon1,
						fosseArgileuse,
						fortifications2,
					],
				});
				const opponent1 = buildPlayer({
					name: "Alice",
					board: [filon2, friche, excavation],
				});
				const opponent2 = buildPlayer({
					name: "Alice",
					board: [ludus1, cavite1, bassinArgileux1, chantier1],
				});
				const game = new SevenWondersGame("gameId", [
					player,
					opponent1,
					opponent2,
				]);

				// When
				const guildPoints = new PointCalculatorService().calculateGuildPoints(
					player,
					game,
				);

				// Then
				expect(guildPoints).toBe(6);
			});
		});
		describe("La guilde des artisans", () => {
			it("rapporte 2 points par produits manufacturés chez les voisins", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [guildeDesArtisans1, verrerie1],
				});
				const opponent1 = buildPlayer({
					name: "Alice",
					board: [presse1, metierATisser2],
				});
				const opponent2 = buildPlayer({
					name: "Alice",
					board: [verrerie2, presse2],
				});
				const game = new SevenWondersGame("gameId", [
					player,
					opponent1,
					opponent2,
				]);

				// When
				const guildPoints = new PointCalculatorService().calculateGuildPoints(
					player,
					game,
				);

				// Then
				expect(guildPoints).toBe(8);
			});
		});
		describe("La guilde des commerçants", () => {
			it("rapporte autant de points que les voisins ont de cartes commerciales", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [guildeDesCommercants1],
				});
				const opponent1 = buildPlayer({
					name: "Alice",
					board: [marche1, comptoirOuest1, taverne1],
				});
				const opponent2 = buildPlayer({
					name: "Alice",
					board: [taverne2, caravanserail3],
				});
				const game = new SevenWondersGame("gameId", [
					player,
					opponent1,
					opponent2,
				]);

				// When
				const guildPoints = new PointCalculatorService().calculateGuildPoints(
					player,
					game,
				);

				// Then
				expect(guildPoints).toBe(5);
			});
		});
		describe("La guilde des philosophes", () => {
			it("rapporte autant de points que les voisins ont de cartes scientifiques", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [guildeDesPhilosophes1],
				});
				const opponent1 = buildPlayer({
					name: "Alice",
					board: [scriptorium1, etude1, universite2],
				});
				const opponent2 = buildPlayer({
					name: "Alice",
					board: [universite1, dispensaire1],
				});
				const game = new SevenWondersGame("gameId", [
					player,
					opponent1,
					opponent2,
				]);

				// When
				const guildPoints = new PointCalculatorService().calculateGuildPoints(
					player,
					game,
				);

				// Then
				expect(guildPoints).toBe(5);
			});
		});
		describe("La guilde des espions", () => {
			it("rapporte autant de points que les voisins ont de cartes militaires", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [guildeDesEspions1],
				});
				const opponent1 = buildPlayer({
					name: "Alice",
					board: [palissade1, caserne1],
				});
				const opponent2 = buildPlayer({
					name: "Alice",
					board: [ecuries1],
				});
				const game = new SevenWondersGame("gameId", [
					player,
					opponent1,
					opponent2,
				]);

				// When
				const guildPoints = new PointCalculatorService().calculateGuildPoints(
					player,
					game,
				);

				// Then
				expect(guildPoints).toBe(3);
			});
		});
		describe("La guilde des armateurs", () => {
			it("rapporte autant de points que le joueur possède de cartes resources, bien manufacturés et guildes", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [
						guildeDesEspions1,
						guildeDesArmateurs1,
						filon2,
						verrerie2,
						marche1,
						universite2,
					],
				});
				const opponent1 = buildPlayer({
					name: "Alice",
					board: [],
				});
				const opponent2 = buildPlayer({
					name: "Alice",
					board: [],
				});
				const game = new SevenWondersGame("gameId", [
					player,
					opponent1,
					opponent2,
				]);

				// When
				const guildPoints = new PointCalculatorService().calculateGuildPoints(
					player,
					game,
				);

				// Then
				expect(guildPoints).toBe(4);
			});
		});
		describe("La guilde des scientifiques", () => {
			it.todo(
				"équivaut à une carte science apportant le plus de points au points scientifiques",
			);
		});
		describe("La guilde des magistrats", () => {
			it("rapporte autant de points que les voisins ont de cartes civilisation", () => {
				// Given
				const player = buildPlayer({
					name: "Alice",
					board: [guildeDesMagistrats1],
				});
				const opponent1 = buildPlayer({
					name: "Alice",
					board: [bains1, aqueduc1, jardins1],
				});
				const opponent2 = buildPlayer({
					name: "Alice",
					board: [theatre1],
				});
				const game = new SevenWondersGame("gameId", [
					player,
					opponent1,
					opponent2,
				]);

				// When
				const guildPoints = new PointCalculatorService().calculateGuildPoints(
					player,
					game,
				);

				// Then
				expect(guildPoints).toBe(4);
			});
		});
		describe("La guilde des bâtisseurs", () => {
			it.todo(
				"rapporte autant de points que les voisins et le joueur ont de stages de merveilles construites",
			);
		});
		describe("La guilde des décorateurs", () => {
			it.todo("rapporte 7 points si le joueur a construit sa merveille");
			it.todo(
				"rapporte 0 point si le joueur n'a pas finit de construire sa merveille",
			);
		});
	});
});
