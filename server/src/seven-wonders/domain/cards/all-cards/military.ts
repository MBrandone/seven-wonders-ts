// Bâtiments Militaires
import { Res } from "@nestjs/common";
import { Resource } from "../../resource";
import { MilitaryCard } from "../military-card";

// Age 1
export const palissade1 = new MilitaryCard("Palissade", 3, 1, 1, [Resource.BOIS], 0);
export const palissade2 = new MilitaryCard("Palissade", 7, 1, 1, [Resource.BOIS], 0);
export const caserne1 = new MilitaryCard("Caserne", 3, 1, 1, [Resource.MINERAI], 0);
export const caserne2 = new MilitaryCard("Caserne", 5, 1, 1, [Resource.MINERAI], 0);
export const tourDeGarde1 = new MilitaryCard("Tour de garde", 3, 1, 1, [Resource.ARGILE], 0);
export const tourDeGarde2 = new MilitaryCard("Tour de garde", 4, 1, 1, [Resource.ARGILE], 0);

// Age 2
export const ecuries1 = new MilitaryCard("Écuries", 3, 2, 2, [Resource.ARGILE, Resource.BOIS, Resource.MINERAI], 0);
export const ecuries2 = new MilitaryCard("Écuries", 5, 2, 2, [Resource.ARGILE, Resource.BOIS, Resource.MINERAI], 0);
export const champsDeTir1 = new MilitaryCard("Champs de tir", 3, 2, 2, [Resource.BOIS, Resource.MINERAI, Resource.MINERAI], 0);
export const champsDeTir2 = new MilitaryCard("Champs de tir", 6, 2, 2, [Resource.BOIS, Resource.MINERAI, Resource.MINERAI], 0);
export const muraille1 = new MilitaryCard("Muraille", 3, 2, 2, [Resource.PIERRE, Resource.PIERRE, Resource.PIERRE], 0);
export const muraille2 = new MilitaryCard("Muraille", 7, 2, 2, [Resource.PIERRE, Resource.PIERRE, Resource.PIERRE], 0);
export const placeDArmes1 = new MilitaryCard("Place d'armes", 4, 2, 2, [Resource.MINERAI, Resource.MINERAI, Resource.BOIS], 0);
export const placeDArmes2 = new MilitaryCard("Place d'armes", 6, 2, 2, [Resource.MINERAI, Resource.MINERAI, Resource.BOIS], 0);
export const placeDArmes3 = new MilitaryCard("Place d'armes", 7, 2, 2, [Resource.MINERAI, Resource.MINERAI, Resource.BOIS], 0);

// Age 3
export const castrum1 = new MilitaryCard("Castrum", 4, 3, 3, [Resource.BOIS, Resource.PAPYRUS, Resource.ARGILE, Resource.ARGILE], 0);
export const castrum2 = new MilitaryCard("Castrum", 7, 3, 3, [Resource.BOIS, Resource.PAPYRUS, Resource.ARGILE, Resource.ARGILE], 0);
export const fortifications1 = new MilitaryCard("Fortifications", 3, 3, 3, [Resource.MINERAI, Resource.MINERAI, Resource.MINERAI, Resource.ARGILE], 0);
export const fortifications2 = new MilitaryCard("Fortifications", 7, 3, 3, [Resource.MINERAI, Resource.MINERAI, Resource.MINERAI, Resource.ARGILE], 0);
export const cirque1 = new MilitaryCard("Cirque", 4, 3, 3, [Resource.ARGILE, Resource.ARGILE, Resource.ARGILE, Resource.MINERAI], 0);
export const cirque2 = new MilitaryCard("Cirque", 6, 3, 3, [Resource.ARGILE, Resource.ARGILE, Resource.ARGILE, Resource.MINERAI], 0);
export const arsenal1 = new MilitaryCard("Arsenal", 3, 3, 3, [Resource.BOIS, Resource.BOIS, Resource.MINERAI, Resource.TISSU], 0);
export const arsenal2 = new MilitaryCard("Arsenal", 5, 3, 3, [Resource.BOIS, Resource.BOIS, Resource.MINERAI, Resource.TISSU], 0);
export const atelierDeSieges1 = new MilitaryCard("Atelier de sièges", 3, 3, 3, [Resource.ARGILE, Resource.ARGILE, Resource.ARGILE, Resource.BOIS], 0);
export const atelierDeSieges2 = new MilitaryCard("Atelier de sièges", 5, 3, 3, [Resource.ARGILE, Resource.ARGILE, Resource.ARGILE, Resource.BOIS], 0);
