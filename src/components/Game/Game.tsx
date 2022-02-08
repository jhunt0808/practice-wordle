import React, { FunctionComponent, useState, useRef, ChangeEvent } from "react";
import Tiles from "../Tiles/Tiles";
import { keys } from '../../utils/keys';
import { getWord, guessRows } from '../../utils/magic';
import "./Game.scss";
import Keys from "../Keys/Keys";


const Game = React.memo(() => {

  const wordle: string = 'SUPER';

  const handleClick = (keyVal: string) => {
    console.log('handleClick', keyVal);
    if(keyVal === '⌫') {
      console.log('delete');
      return;
    }
    if(keyVal === 'ENTER') {
      console.log('check row');
      return;
    }
    addLetter(keyVal);
  }

  let currentRow: number = 0;
  let currentTile: number = 0;

  const addLetter = (letter: string) => {
    const tile = document.getElementById(`guessRow-` + currentRow + `-tile-` + currentTile);
    tile!.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    tile!.setAttribute('data', letter);
    console.log(guessRows);
    currentTile++;
  }

  return (
    <div className="game-container">
      <div className="title-container">
        <h1>Not Wordle</h1>
      </div>
      <div className="message-container"></div>

      <Tiles guessRows={guessRows} />
      
      <Keys keys={keys} handleClick={(keyVal: string) => handleClick(keyVal)} />
      

    </div>
  );
});

export default Game;
