export enum Evaluation {
	CORRECT = "correct",
	PRESENT = "present",
	NOPE = "nope"
}

export const KeyCodes = {
	A: 65,
	Z: 90,
	Backspace: 8,
	Enter: 13,
};

export type Guesses = {
	1: number,
	2: number,
	3: number,
	4: number,
	5: number,
	6: number,
	fail: number,
}

export type Statistics = {
	currentStreak: number,
	gamesPlayed: number,
	gamesWon: number,
	guesses: Guesses,
	maxStreak: number,
	winPercentage: number,
	wordsUsed: string[]
}