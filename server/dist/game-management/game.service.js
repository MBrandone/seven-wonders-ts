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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const game_repository_1 = require("./game.repository");
const player_repository_1 = require("./player/player.repository");
const game_entity_1 = require("./game.entity");
const player_entity_1 = require("./player/player.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
let GameService = class GameService {
    gameRepository;
    playerRepository;
    eventEmitter;
    constructor(gameRepository, playerRepository, eventEmitter) {
        this.gameRepository = gameRepository;
        this.playerRepository = playerRepository;
        this.eventEmitter = eventEmitter;
    }
    async createGame(maxPlayers) {
        const id = (0, uuid_1.v4)();
        const createdAt = new Date();
        const status = 'waiting';
        const game = new game_entity_1.Game(id, createdAt, status, maxPlayers, []);
        await this.gameRepository.createGame(game);
        return {
            id: game.id,
            created_at: game.createdAt,
            status: game.status,
            max_players: game.maxPlayers,
        };
    }
    async addPlayerToGame(gameId, playerName) {
        const game = await this.gameRepository.findById(gameId);
        if (!game) {
            throw new Error('Partie non trouvée');
        }
        if (!game.canAddPlayer()) {
            throw new Error('Nombre maximum de joueurs atteint pour cette partie');
        }
        let player = await this.playerRepository.findByName(playerName);
        if (!player) {
            player = new player_entity_1.Player((0, uuid_1.v4)(), playerName, new Date());
            await this.playerRepository.createPlayer(player);
        }
        const result = await this.gameRepository.addPlayerToGame(gameId, player.id);
        this.eventEmitter.emit('player.joined', { gameId });
        return result;
    }
    async listAvailableGames() {
        const games = await this.gameRepository.findWaitingGames();
        return games
            .map(game => ({
            id: game.id,
            created_at: game.createdAt,
            status: game.status,
            max_players: game.maxPlayers,
            playerCount: game.players.length,
        }))
            .filter(g => g.playerCount < g.max_players);
    }
    async getGameWithPlayers(gameId) {
        const game = await this.gameRepository.findById(gameId);
        if (!game) {
            throw new Error('Partie non trouvée');
        }
        const players = await Promise.all(game.players.map(async (playerId) => {
            const player = await this.playerRepository.findById(playerId);
            return player ? { id: player.id, name: player.name } : null;
        }));
        return {
            id: game.id,
            created_at: game.createdAt,
            status: game.status,
            max_players: game.maxPlayers,
            players: players.filter(Boolean),
        };
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [game_repository_1.GameRepository,
        player_repository_1.PlayerRepository,
        event_emitter_1.EventEmitter2])
], GameService);
//# sourceMappingURL=game.service.js.map