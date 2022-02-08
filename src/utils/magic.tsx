import _ from 'lodash';

type word = {
	word: string
}



export function getWord(): string {
	const words = require('./words.json');

	return _.sample(words);
}

export const guessRows = [
	['','','','','',],
	['','','','','',],
	['','','','','',],
	['','','','','',],
	['','','','','',],
	['','','','','',]
]