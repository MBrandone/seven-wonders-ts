export class Game {
  constructor(
    public id: string,
    public createdAt: Date,
    public status: 'waiting' | 'in_progress' | 'finished',
    public maxPlayers: number,
    public players: string[] // ou Player[] si besoin
  ) {
    if (maxPlayers < 3 || maxPlayers > 7) {
      throw new Error('Un jeu doit avoir entre 3 et 7 joueurs maximum.');
    }
  }

  canAddPlayer(): boolean {
    return this.players.length < this.maxPlayers;
  }

  // Autres méthodes métier possibles...
} 