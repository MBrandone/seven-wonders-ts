import { Resource } from "./resource";
import { Player } from "./player.entity";
import {
	jardinsSuspendusDeBabylone,
	colosseDeRhodes,
	pyramideDeGizeh,
	statueDeZeusAOlympie,
} from "./wonders/all-wonders";
import { scierie1, friche, excavation } from "./cards/all-cards/raw-material-cards";
import { carriere1 } from "./cards/all-cards/raw-material-cards";
import { verrerie1 } from "./cards/all-cards/manufactured-good";
import { presse1 } from "./cards/all-cards/manufactured-good";
import { caserne1 } from "./cards/all-cards/military";

describe("Player.getResources", () => {
	it("retourne la ressource de base de la merveille", () => {
		const player = Player.create("player-1", "Alice");
		player.wonder = jardinsSuspendusDeBabylone;

		const resources = player.getResources();

		expect(resources.get(Resource.BOIS)).toBe(1);
		expect(resources.size).toBe(1);
	});

	it("retourne les ressources produites par les cartes RAW_MATERIAL sur le plateau", () => {
		const player = Player.create("player-1", "Alice");
		player.wonder = colosseDeRhodes;
		player.board = [scierie1, carriere1];

		const resources = player.getResources();

		expect(resources.get(Resource.MINERAI)).toBe(1);
		expect(resources.get(Resource.BOIS)).toBe(2); 
		expect(resources.get(Resource.PIERRE)).toBe(2);
		expect(resources.size).toBe(3);
	});

	it("retourne les ressources produites par les cartes MANUFACTURED_GOOD sur le plateau", () => {
		const player = Player.create("player-1", "Alice");
		player.wonder = statueDeZeusAOlympie;
		player.board = [verrerie1, presse1];

		const resources = player.getResources();

		expect(resources.get(Resource.ARGILE)).toBe(1); 
		expect(resources.get(Resource.VERRE)).toBe(1); 
		expect(resources.get(Resource.PAPYRUS)).toBe(1); 
		expect(resources.size).toBe(3);
	});

	it("compte correctement les ressources multiples de même type", () => {
		const player = Player.create("player-1", "Alice");
		player.wonder = jardinsSuspendusDeBabylone;
		player.board = [scierie1, scierie1]; 

		const resources = player.getResources();

		expect(resources.get(Resource.BOIS)).toBe(5); 
		expect(resources.size).toBe(1);
	});

	it("ne compte pas les cartes qui ne produisent pas de ressources", () => {
		const player = Player.create("player-1", "Alice");
		player.wonder = pyramideDeGizeh;
		player.board = [caserne1]; 

		const resources = player.getResources();

		expect(resources.get(Resource.PIERRE)).toBe(1); 
		expect(resources.size).toBe(1);
	});

	it("retourne une Map vide si le joueur n'a pas de merveille et aucune carte sur le plateau", () => {
		const player = Player.create("player-1", "Alice");
		

		const resources = player.getResources();

		expect(resources.size).toBe(0);
	});

	it("combine correctement toutes les sources de ressources", () => {
		const player = Player.create("player-1", "Alice");
		player.wonder = colosseDeRhodes;
		player.board = [scierie1, verrerie1, presse1];

		const resources = player.getResources();

		expect(resources.get(Resource.MINERAI)).toBe(1); 
		expect(resources.get(Resource.BOIS)).toBe(2); 
		expect(resources.get(Resource.VERRE)).toBe(1); 
		expect(resources.get(Resource.PAPYRUS)).toBe(1); 
		expect(resources.size).toBe(4);
	});

	it("utilise numberOfResources pour déterminer combien de ressources prendre depuis resourcesProduced", () => {
		const player = Player.create("player-1", "Alice");
		player.wonder = statueDeZeusAOlympie;
		
		player.board = [friche];

		const resources = player.getResources();

		expect(resources.get(Resource.ARGILE)).toBe(1);
		expect(resources.get(Resource.BOIS)).toBe(1);
		expect(resources.has(Resource.MINERAI)).toBe(false);
		expect(resources.size).toBe(2);
	});

	it("peut prendre 2 ressources si numberOfResources = 2", () => {
		const player = Player.create("player-1", "Alice");
		player.wonder = colosseDeRhodes;
		
		player.board = [excavation];

		const resources = player.getResources();

		expect(resources.get(Resource.MINERAI)).toBe(1); 
		expect(resources.get(Resource.PIERRE)).toBe(1); 
		expect(resources.has(Resource.ARGILE)).toBe(false); 
		expect(resources.size).toBe(2);
	});
});

