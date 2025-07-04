"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManagementModule = void 0;
const common_1 = require("@nestjs/common");
const game_management_service_1 = require("./services/game-management.service");
const game_management_controller_1 = require("./application/game-management.controller");
const game_repository_1 = require("./persistence/game.repository");
const player_repository_1 = require("./player/player.repository");
const database_module_1 = require("../database/database.module");
const game_management_gateway_1 = require("./application/game-management.gateway");
const player_joined_reactor_1 = require("./services/player-joined.reactor");
const event_emitter_1 = require("@nestjs/event-emitter");
let GameManagementModule = class GameManagementModule {
};
exports.GameManagementModule = GameManagementModule;
exports.GameManagementModule = GameManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, event_emitter_1.EventEmitterModule.forRoot()],
        providers: [game_management_service_1.GameManagementService, game_repository_1.GameRepository, player_repository_1.PlayerRepository, game_management_gateway_1.GameManagementGateway, player_joined_reactor_1.PlayerJoinedReactor],
        controllers: [game_management_controller_1.GameManagementController],
        exports: [game_management_service_1.GameManagementService],
    })
], GameManagementModule);
//# sourceMappingURL=game-management.module.js.map