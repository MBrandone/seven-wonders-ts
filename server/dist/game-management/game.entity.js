"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    id;
    createdAt;
    status;
    maxPlayers;
    players;
    constructor(id, createdAt, status, maxPlayers, players) {
        this.id = id;
        this.createdAt = createdAt;
        this.status = status;
        this.maxPlayers = maxPlayers;
        this.players = players;
        if (maxPlayers < 3 || maxPlayers > 7) {
            throw new Error('Un jeu doit avoir entre 3 et 7 joueurs maximum.');
        }
    }
    canAddPlayer() {
        return this.players.length < this.maxPlayers;
    }
}
exports.Game = Game;
//# sourceMappingURL=game.entity.js.map