// Entité Wonder pour la logique métier Seven Wonders

export enum WonderResource {
  BOIS = 'Bois',
  PIERRE = 'Pierre',
  ARGILE = 'Argile',
  MINERAI = 'Minerai',
  PAPYRUS = 'Papyrus',
  VERRE = 'Verre',
  TISSU = 'Tissu',
}

enum WonderType {
  NUIT = 'Nuit',
  JOUR = 'Jour',
}

export class Wonder {
  constructor(
    public readonly name: string,
    public readonly baseResource: WonderResource,
  ) {}
}

export const ALL_WONDERS: Wonder[] = [
  new Wonder('Le Colosse de Rhodes', WonderResource.MINERAI),
  new Wonder('Le Phare d’Alexandrie', WonderResource.VERRE),
  new Wonder('La Pyramide de Gizeh', WonderResource.PIERRE),
  new Wonder('Le Mausolée d’Halicarnasse', WonderResource.TISSU),
  new Wonder('La Statue de Zeus à Olympie', WonderResource.ARGILE),
  new Wonder('Le Temple d’Artémis à Éphèse', WonderResource.PAPYRUS),
  new Wonder('Les Jardins suspendus de Babylone', WonderResource.BOIS),
]; 