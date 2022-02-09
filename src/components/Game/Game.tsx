import React, { FunctionComponent, useState, useRef, ChangeEvent } from "react";
import Tiles from "../Tiles/Tiles";
import { keys } from '../../utils/keys';
import { getWord, guessRows } from '../../utils/magic';
import "./Game.scss";
import Keys from "../Keys/Keys";
import Message from "../Message/Message";


const Game = React.memo(() => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const wordle: string = 'SUPER';

  const handleClick = (keyVal: string) => {
    if(keyVal === '⌫') {
      deleteLetter();
      return;
    }
    if(keyVal === 'ENTER') {
      checkRow();
      return;
    }
    addLetter(keyVal);
  }

  let currentRow: number = 0;
  let currentTile: number = 0;

  const addLetter = (letter: string) => {
    if(currentTile < 5 && currentRow < 6) {
      const tile = document.getElementById(`guessRow-` + currentRow + `-tile-` + currentTile);
      tile!.textContent = letter;
      guessRows[currentRow][currentTile] = letter;
      tile!.setAttribute('data', letter);
      currentTile++;
    }
  }

  const deleteLetter = () => {
    if(currentTile > 0){
      currentTile--;
      const tile = document.getElementById(`guessRow-` + currentRow + `-tile-` + currentTile);
      tile!.textContent = '';
      guessRows[currentRow][currentTile] = '';
      tile?.setAttribute('data', '');
    }
  }

  const checkRow = () => {
    const guess = guessRows[currentRow].join('');

    if(currentTile > 4){
      flipTile();
      if(wordle === guess){
        showMessage('You did it!');
        setIsGameOver(true);
        return;
      } else {
        if(currentRow >= 5) {
          setIsGameOver(false);
          return;
        }

        if(currentRow < 5){
          currentRow++;
          currentTile = 0;
        }
      }
    }
  }

  const showMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => setMessage(''), 2000);
  }

  const addColorToKey = (keyLetter: string, color: string) => {
    const key = document.getElementById(keyLetter);
    key!.classList.add(color);
  }

  const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow)?.childNodes;
    let checkWordle = wordle;
    const guess: { letter: any; color: string; }[] = [];

    rowTiles?.forEach((tile: any) => {
      guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    });

    guess.forEach((guess: any, index: number) => {
      if(guess.letter === wordle[index]){
        guess.color = 'green-overlay';
        checkWordle = checkWordle.replace(guess.letter, '');
      }
    })

    guess.forEach((guess: any) => {
      if(checkWordle.includes(guess.letter)){
        guess.color = 'yellow-overlay';
        checkWordle = checkWordle.replace(guess.letter, '');
      }
    })
    
    rowTiles!.forEach((tile: any, index: number) => {
      setTimeout(() => {
        tile.classList.add('flip');
        tile.classList.add(guess[index].color);
        addColorToKey(guess[index].letter, guess[index].color);
      }, 500 * index);
    })
  }

  return (
    <div className="game-container">
      <div className="title-container">
        <h1>Not Wordle</h1>
      </div>

      <Message message={message} />

      <Tiles guessRows={guessRows} />
      
      <Keys keys={keys} handleClick={(keyVal: string) => handleClick(keyVal)} />
      

    </div>
  );
});

export default Game;
