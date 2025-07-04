import { HealthCheckService } from './health-check.service';
export declare class HealthCheckController {
    private readonly healthCheckService;
    constructor(healthCheckService: HealthCheckService);
    getHello(): string;
}
