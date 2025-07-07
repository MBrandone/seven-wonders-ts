import { Game } from "./game.entity";
import { Player } from "./player.entity";

export interface GameRepository {
  createGame(game: Game, player: Player): Promise<Game>;
  findById(id: string): Promise<Game | null>;
  addPlayerToGame(gameId: Game, playerId: string): Promise<{ id: string; game_id: string; player_id: string }>;
  findWaitingGames(): Promise<Game[]>;
} 