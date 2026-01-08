import { Injectable } from "@nestjs/common";
import { SevenWondersGameRepository as SevenWonderGameRepository } from "../domain/game-repository";
import { SevenWondersGame } from "../domain/seven-wonders-game";

@Injectable()
export class InMemoryGameRepository implements SevenWonderGameRepository {
    games: SevenWondersGame[] = []
    
    addGame(game: SevenWondersGame): Promise<void> {
        this.games.push(game)
        return Promise.resolve()
    }

    findById(gameId: string): Promise<SevenWondersGame | null> {
        const game = this.games.find((game) => game.id === gameId)
        if (!game) {
            return Promise.resolve(null)
        }
        return Promise.resolve(game)
    }

}