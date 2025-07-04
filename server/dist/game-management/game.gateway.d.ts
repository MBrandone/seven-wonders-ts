import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    emitGameFull(gameId: string): void;
    handleJoin(gameId: string, client: any): void;
}
