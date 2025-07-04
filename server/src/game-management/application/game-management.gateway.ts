import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class GameManagementGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    // Optionnel : log ou authentification
  }

  handleDisconnect(client: any) {
    // Optionnel : log
  }

  emitGameFull(gameId: string) {
    this.server.to(gameId).emit('gameFull', { gameId });
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() gameId: string, @ConnectedSocket() client: any) {
    client.join(gameId);
    // Optionnel : log ou accusé de réception
  }
} 