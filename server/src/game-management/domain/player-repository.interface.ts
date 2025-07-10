import type { Player } from "./player.entity";

export interface PlayerRepository {
	findByName(name: string): Promise<Player | null>;
	createPlayer(player: Player): Promise<Player>;
	findById(id: string): Promise<Player | null>;
}
