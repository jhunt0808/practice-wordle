import React, { FunctionComponent } from 'react';
import { Guesses } from '../../types/types';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface IGuessGraphProps {
	guesses: Guesses;
	gamesPlayed: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

const GuessGraph: FunctionComponent<IGuessGraphProps> = ({
	guesses,
	gamesPlayed,
}) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: 'Guess Distribution',
				color: '#ffffff',
				font: {
					family: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif',
					size: 16,
				},
			},
		},
		scales: {
			x: {
				grid: {
					color: '#FFFFFF',
				},
				ticks: {
					color: '#FFFFFF',
					stepSize: 1,
				},
			},
			y: {
				grid: {
					color: '#FFFFFF',
				},
				ticks: {
					color: '#FFFFFF',
					stepSize: gamesPlayed >= 5 ? 5 : 1,
				},
			},
		},
	};

	const labels = ['1', '2', '3', '4', '5', '6'];

	const guessesList: number[] = Object.values(guesses);
	guessesList.pop();
	const guessesStringList: string[] = guessesList.map(String);

	const data = {
		labels,
		datasets: [
			{
				label: 'Guesses',
				data: guessesStringList,
				backgroundColor: '#b59f3a',
			},
		],
	};

	return <Bar options={options} data={data} />;
};

export default GuessGraph;
