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
exports.PlayerJoinedReactor = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const game_repository_1 = require("./persistence/game.repository");
const game_management_gateway_1 = require("./application/game-management.gateway");
let PlayerJoinedReactor = class PlayerJoinedReactor {
    gameRepository;
    gameGateway;
    constructor(gameRepository, gameGateway) {
        this.gameRepository = gameRepository;
        this.gameGateway = gameGateway;
    }
    async handlePlayerJoined(payload) {
        const game = await this.gameRepository.findById(payload.gameId);
        if (game && !game.canAddPlayer()) {
            this.gameGateway.emitGameFull(game.id);
        }
    }
};
exports.PlayerJoinedReactor = PlayerJoinedReactor;
__decorate([
    (0, event_emitter_1.OnEvent)('player.joined'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayerJoinedReactor.prototype, "handlePlayerJoined", null);
exports.PlayerJoinedReactor = PlayerJoinedReactor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [game_repository_1.GameRepository,
        game_management_gateway_1.GameManagementGateway])
], PlayerJoinedReactor);
//# sourceMappingURL=player-joined.reactor.js.map