import _ from 'lodash';

function wordList(): string[] {
	const words = require('./words.json');
	
	const wordsEndWithS = _.filter(words, function(w) { return w.charAt(4) === 's'})
	const wordsEndWithSS = _.filter(words, function(w) { return w.charAt(3) === 's' && w.charAt(4) === 's'})
	const newWordsList = _.concat(wordsEndWithSS, _.difference(words, wordsEndWithS));
	return newWordsList;
}

function filteredWords(): string[] {
	const words = require('./filteredWords.json');
	return words;
}

const wordsToUse: string[] = filteredWords();

export function getWord(): string {
	const word = _.sample(wordsToUse);

	return _.upperCase(word);
}

export function isInWordList(guess: string): boolean {
	return _.includes(wordsToUse, guess.toLowerCase());
}

export function resetGuessRows(): string[][] {
	return [
		['','','','','',],
		['','','','','',],
		['','','','','',],
		['','','','','',],
		['','','','','',],
		['','','','','',]
	];
}

export const guessRows = [
	['','','','','',],
	['','','','','',],
	['','','','','',],
	['','','','','',],
	['','','','','',],
	['','','','','',]
];