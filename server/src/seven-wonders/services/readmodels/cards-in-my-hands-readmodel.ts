export type CardsInMyHandsReadmodel = {
	cards: {
		name: string;
		type: string;
		playability: Playability;
	}[];
};

export type Playability = Playable | NotPlayable | PlayableWithPayment;

export enum PlayableEnum {
	YES = "YES",
	NO = "NO",
	WITH_PAYMENT = "WITH_PAYMENT",
}

export type Playable = { playable: PlayableEnum.YES };

export type NotPlayable = { playable: PlayableEnum.NO };

export type PlayableWithPayment = {
	playable: PlayableEnum.WITH_PAYMENT;
	possibleTransactionsCombinations: TransactionCombination[];
};

export type Transaction = { playerName: string; cost: number };
export type TransactionCombination = Transaction[];

export const playable = (): Playable => ({
	playable: PlayableEnum.YES,
});

export const notPlayable = (): NotPlayable => ({
	playable: PlayableEnum.NO,
});

export const playableWithPayment = (
	possibleTransactionsCombinations: TransactionCombination[],
): PlayableWithPayment => ({
	playable: PlayableEnum.WITH_PAYMENT,
	possibleTransactionsCombinations,
});
