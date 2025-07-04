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
exports.PlayerRepository = void 0;
const kysely_1 = require("kysely");
const player_entity_1 = require("./player.entity");
const common_1 = require("@nestjs/common");
let PlayerRepository = class PlayerRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async findByName(name) {
        const row = await this.db.selectFrom('players').selectAll().where('name', '=', name).executeTakeFirst();
        if (!row)
            return null;
        return new player_entity_1.Player(row.id, row.name, row.created_at);
    }
    async createPlayer(player) {
        await this.db.insertInto('players').values({
            id: player.id,
            name: player.name,
            created_at: player.createdAt
        }).executeTakeFirst();
        return player;
    }
    async findById(id) {
        const row = await this.db.selectFrom('players').selectAll().where('id', '=', id).executeTakeFirst();
        if (!row)
            return null;
        return new player_entity_1.Player(row.id, row.name, row.created_at);
    }
};
exports.PlayerRepository = PlayerRepository;
exports.PlayerRepository = PlayerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Kysely')),
    __metadata("design:paramtypes", [kysely_1.Kysely])
], PlayerRepository);
//# sourceMappingURL=player.repository.js.map