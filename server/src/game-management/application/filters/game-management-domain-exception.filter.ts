import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { GameManagementDomainError } from "../../domain/errors/game-management-domain.error";

@Catch(GameManagementDomainError)
export class GameManagementDomainExceptionFilter implements ExceptionFilter {
	catch(exception: GameManagementDomainError, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		response.status(HttpStatus.CONFLICT).json({ error: exception.message });
	}
}
