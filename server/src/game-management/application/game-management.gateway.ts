import {
	ConnectedSocket,
	MessageBody,
	type OnGatewayConnection,
	type OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class GameManagementGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer()
	server: Server;

	handleConnection(_client: Socket) {
		// Optionnel : log ou authentification
	}

	handleDisconnect(_client: Socket) {
		// Optionnel : log
	}

	emitGameFull(gameId: string) {
		this.server.to(gameId).emit("gameFull", { gameId });
	}

	@SubscribeMessage("join")
	handleJoin(@MessageBody() gameId: string, @ConnectedSocket() client: Socket) {
		client.join(gameId);
		// Optionnel : log ou accusé de réception
	}
}
