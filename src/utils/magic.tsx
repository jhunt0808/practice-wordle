import _ from 'lodash';
import { Statistics } from '../types/types';

// function wordList(): string[] {
// 	//const words = require('./words.json');
// 	const words = require('./filteredWords.json');
	
// 	const wordsEndWithS = _.filter(words, function(w) { return w.charAt(4) === 's'})
// 	const wordsEndWithSS = _.filter(words, function(w) { return w.charAt(3) === 's' && w.charAt(4) === 's'})
// 	const newWordsList = _.concat(wordsEndWithSS, _.difference(words, wordsEndWithS));
// 	function hasDupplicateLetters(str: string) {
// 		if((/(\w)\1{1}/).test(str)){
// 			console.log(str);
// 		}
// 	}

// 	_.forEach(newWordsList, hasDupplicateLetters);

// 	return newWordsList;
// }

function filteredWords(): string[] {
	const words = require('./filteredWords.json');
	return words;
}

const wordsToUse: string[] = filteredWords();

export function getWord(wordsUsed: string[]): string {
	const pickFromThisList = _.difference(wordsToUse, wordsUsed)
	const word = _.sample(pickFromThisList);

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

export const defaultGuessRows = [
	['','','','','',],
	['','','','','',],
	['','','','','',],
	['','','','','',],
	['','','','','',],
	['','','','','',]
];

export function resetBoard() {
	const tiles = document.getElementsByClassName('tile');
	for (var i = 0; i < tiles.length; i++) {
		tiles[i].textContent = '';
		tiles[i].setAttribute('data', '');
		tiles[i].className = 'tile';
	};
	const keys = document.getElementsByClassName('key-button');
	for (var k = 0; k < keys.length; k++) {
		keys[k].className = 'key-button';
	};
}

export const defaultStatistics: Statistics = {
	currentStreak: 0,
	gamesPlayed: 0,
	gamesWon: 0,
	guesses: {
	  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0
	},
	maxStreak: 0,
	winPercentage: 0,
	wordsUsed: []
  }