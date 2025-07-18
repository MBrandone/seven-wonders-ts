import { Controller, Get } from "@nestjs/common";
import type { HealthCheckService } from "./health-check.service";

@Controller()
export class HealthCheckController {
	constructor(private readonly healthCheckService: HealthCheckService) {}

	@Get()
	getHello(): string {
		return this.healthCheckService.getHello();
	}
}
