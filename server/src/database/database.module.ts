import { Module } from "@nestjs/common";
import { kyselyProvider } from "./kysely.provider";

@Module({
	providers: [kyselyProvider],
	exports: [kyselyProvider],
})
export class DatabaseModule {}
