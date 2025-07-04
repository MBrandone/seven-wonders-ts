"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRepository = void 0;
const kysely_1 = require("kysely");
const game_entity_1 = require("./game.entity");
const common_1 = require("@nestjs/common");
let GameRepository = class GameRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async findById(id) {
        const gameRow = await this.db.selectFrom('games').selectAll().where('id', '=', id).executeTakeFirst();
        if (!gameRow)
            return null;
        const players = await this.db.selectFrom('game_players').select('player_id').where('game_id', '=', id).execute();
        return new game_entity_1.Game(gameRow.id, gameRow.created_at, gameRow.status, gameRow.max_players, players.map(p => p.player_id));
    }
    async createGame(game) {
        await this.db.insertInto('games').values({
            id: game.id,
            created_at: game.createdAt,
            status: game.status,
            max_players: game.maxPlayers
        }).executeTakeFirst();
        return game;
    }
    async findWaitingGames() {
        const gameRows = await this.db.selectFrom('games').selectAll().where('status', '=', 'waiting').execute();
        const games = [];
        for (const row of gameRows) {
            const players = await this.db.selectFrom('game_players').select('player_id').where('game_id', '=', row.id).execute();
            games.push(new game_entity_1.Game(row.id, row.created_at, row.status, row.max_players, players.map(p => p.player_id)));
        }
        return games;
    }
    async addPlayerToGame(gameId, playerId) {
        const id = crypto.randomUUID ? crypto.randomUUID() : require('uuid').v4();
        await this.db.insertInto('game_players').values({ id, game_id: gameId, player_id: playerId }).executeTakeFirst();
        return { id, game_id: gameId, player_id: playerId };
    }
};
exports.GameRepository = GameRepository;
exports.GameRepository = GameRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Kysely')),
    __metadata("design:paramtypes", [kysely_1.Kysely])
], GameRepository);
//# sourceMappingURL=game.repository.js.map