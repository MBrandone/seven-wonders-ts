import { Injectable } from "@nestjs/common";
import { SevenWondersGameRepository  } from "../domain/game-repository";
import { SevenWondersGame } from "../domain/seven-wonders-game";
import { Player } from "../domain/player.entity";
import { ALL_CARDS } from "../domain/cards/all-cards/all-cards";
import { ALL_WONDERS } from "../domain/wonder.entity";
import { Deck } from "../domain/deck/deck.entity";

@Injectable()
export class DummyGameRepository implements SevenWondersGameRepository {
    games: SevenWondersGame[] = []
    
    constructor() {
        this.createGameForE2eTest();
    }

    addGame(game: SevenWondersGame): Promise<void> {
        return Promise.resolve()
    }

    findById(gameId: string): Promise<SevenWondersGame | null> {
        return Promise.resolve(this.games[0])
    }

    private createGameForE2eTest() {
        const player1 = Player.create("1", "Alice");
        const player2 = Player.create("2", "Bob");
        const player3 = Player.create("3", "Charlie");

        const game = new SevenWondersGame("e2e", [player1, player2, player3]);
        const deck = new Deck(ALL_CARDS);

        game.assignWonders(ALL_WONDERS);
        game.assignCards(deck);

        this.games.push(game);
    }
}