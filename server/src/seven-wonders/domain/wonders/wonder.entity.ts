import { Resource } from "../resource";

export class WonderStage {
	constructor(
		public isBuilt: boolean,
		public readonly civilizationPoints: number,
	) {}
}

export class Wonder {
	constructor(
		public readonly name: string,
		public readonly baseResource: Resource,
		public stages: WonderStage[],
	) {}
}


