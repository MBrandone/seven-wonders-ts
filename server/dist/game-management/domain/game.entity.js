"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const game_status_enum_1 = require("./game-status.enum");
class Game {
    id;
    createdAt;
    maxPlayers;
    players;
    status;
    constructor(id, createdAt, maxPlayers, players, status) {
        this.id = id;
        this.createdAt = createdAt;
        this.maxPlayers = maxPlayers;
        this.players = players;
        this.status = status;
        this.status = game_status_enum_1.GameStatus.WAITING;
        if (maxPlayers < 3 || maxPlayers > 7) {
            throw new Error('Un jeu doit avoir entre 3 et 7 joueurs maximum.');
        }
    }
    static create(id, createdAt, maxPlayers, players) {
        return new Game(id, createdAt, maxPlayers, players, game_status_enum_1.GameStatus.WAITING);
    }
    static hydrate(id, createdAt, maxPlayers, players, status) {
        return new Game(id, createdAt, maxPlayers, players, status);
    }
    canAddPlayer() {
        return this.players.length < this.maxPlayers;
    }
}
exports.Game = Game;
//# sourceMappingURL=game.entity.js.map