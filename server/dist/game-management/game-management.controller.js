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
exports.GameManagementController = void 0;
const common_1 = require("@nestjs/common");
const game_management_service_1 = require("./game-management.service");
let GameManagementController = class GameManagementController {
    gameService;
    constructor(gameService) {
        this.gameService = gameService;
    }
    async createGame(maxPlayers) {
        if (typeof maxPlayers !== 'number' || maxPlayers < 3 || maxPlayers > 7) {
            return { error: 'maxPlayers doit être un nombre entre 3 et 7' };
        }
        return this.gameService.createGame(maxPlayers);
    }
    async addPlayerToGame(gameId, playerName) {
        if (!playerName) {
            return { error: 'playerName est requis.' };
        }
        return this.gameService.addPlayerToGame(gameId, playerName);
    }
    async listAvailableGames() {
        return this.gameService.listAvailableGames();
    }
    async getGame(gameId) {
        return this.gameService.getGameWithPlayers(gameId);
    }
};
exports.GameManagementController = GameManagementController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('maxPlayers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameManagementController.prototype, "createGame", null);
__decorate([
    (0, common_1.Post)(':gameId/players'),
    __param(0, (0, common_1.Param)('gameId')),
    __param(1, (0, common_1.Body)('playerName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GameManagementController.prototype, "addPlayerToGame", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameManagementController.prototype, "listAvailableGames", null);
__decorate([
    (0, common_1.Get)(':gameId'),
    __param(0, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GameManagementController.prototype, "getGame", null);
exports.GameManagementController = GameManagementController = __decorate([
    (0, common_1.Controller)('games'),
    __metadata("design:paramtypes", [game_management_service_1.GameManagementService])
], GameManagementController);
//# sourceMappingURL=game-management.controller.js.map