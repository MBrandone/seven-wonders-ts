import { GameStatus } from "./game-status.enum";

export class Game {
  
  private constructor(
    public id: string,
    public createdAt: Date,
    public maxPlayers: number,
    public players: string[],
    public status: GameStatus
  ) {
    this.status = GameStatus.WAITING;
    if (maxPlayers < 3 || maxPlayers > 7) {
      throw new Error('Un jeu doit avoir entre 3 et 7 joueurs maximum.');
    }
  }

  static create(id: string, createdAt: Date, maxPlayers: number, players: string[]): Game {
    return new Game(id, createdAt, maxPlayers, players, GameStatus.WAITING);
  }

  static hydrate(id: string, createdAt: Date, maxPlayers: number, players: string[], status: GameStatus): Game {
    return new Game(id, createdAt, maxPlayers, players, status);
  }

  canAddPlayer(): boolean {
    return this.players.length < this.maxPlayers;
  }

} 