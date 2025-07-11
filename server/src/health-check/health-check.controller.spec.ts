import { HealthCheckController } from "./health-check.controller";
import { HealthCheckService } from "./health-check.service";

describe("AppController", () => {
	let appController2: HealthCheckController;

	beforeEach(async () => {
		appController2 = new HealthCheckController(new HealthCheckService());
	});

	describe("root", () => {
		it('should return "Hello World!"', () => {
			expect(appController2.getHello()).toBe("Hello World!");
		});
	});
});
