import { Game } from "./game.entity";

export interface GameRepository {
  createGame(game: any): Promise<Game>;
  findById(id: string): Promise<Game | null>;
  addPlayerToGame(gameId: string, playerId: string): Promise<{ id: string; game_id: string; player_id: string }>;
  findWaitingGames(): Promise<Game[]>;
} 