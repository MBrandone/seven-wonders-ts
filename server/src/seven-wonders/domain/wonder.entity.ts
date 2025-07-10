import { Resource } from "./resource";

export class WonderStage {
  constructor(
    public isBuilt: boolean,
    public readonly civilizationPoints: number,
  ) {}
}

export class Wonder {
  constructor(
    public readonly name: string,
    public readonly baseResource: Resource,
    public stages: WonderStage[]
  ) {}
}

export const ALL_WONDERS: Wonder[] = [
  new Wonder('Le Colosse de Rhodes', Resource.MINERAI, []),
  new Wonder('Le Phare d’Alexandrie', Resource.VERRE, []),
  new Wonder('La Pyramide de Gizeh', Resource.PIERRE, []),
  new Wonder('Le Mausolée d’Halicarnasse', Resource.TISSU, []),
  new Wonder('La Statue de Zeus à Olympie', Resource.ARGILE, []),
  new Wonder('Le Temple d’Artémis à Éphèse', Resource.PAPYRUS, []),
  new Wonder('Les Jardins suspendus de Babylone', Resource.BOIS, []),
]; 