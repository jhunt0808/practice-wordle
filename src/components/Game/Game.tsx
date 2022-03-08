import React, { useEffect, useState } from "react";
import { KeyCodes } from '../../types/types';
import { keys } from '../../utils/keys';
import { getWord, defaultGuessRows, defaultStatistics, isInWordList, resetGuessRows, resetBoard } from '../../utils/magic';
import Keys from "../Keys/Keys";
import Message from "../Message/Message";
import Tiles from "../Tiles/Tiles";
import "./Game.scss";

const Game = React.memo(() => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [wordle, setWorld] = useState<string>('');
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentTile, setCurrentTile] = useState<number>(0);
  const [statistics, setStatistics] = useState<any>(defaultStatistics);

  let guessRows = defaultGuessRows;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyInput = (keyVal: string) => {
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

  const addLetter = (letter: string) => {
    if(currentTile < 5 && currentRow < 6) {
      const tile = document.getElementById(`guessRow-` + currentRow + `-tile-` + currentTile);
      tile!.textContent = letter;
      guessRows[currentRow][currentTile] = letter;
      tile!.setAttribute('data', letter);
      setCurrentTile(currentTile + 1);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deleteLetter = () => {
    if(currentTile > 0){   
      const tileToDelete = currentTile - 1;   
      const tile = document.getElementById(`guessRow-` + currentRow + `-tile-` + tileToDelete);
      tile!.textContent = '';
      guessRows[currentRow][tileToDelete] = '';
      tile?.setAttribute('data', '');
      setCurrentTile(currentTile - 1);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkRow = () => {
    const guess = guessRows[currentRow].join('');

    if(currentTile > 4 && !isGameOver){
      if(!isInWordList(guess)){
        showMessage('Not in the word list!');
        return;
      }

      flipTile();
      if(wordle === guess){
        showMessage('You did it!');
        setIsGameOver(true);
        let guessRow: number = currentRow + 1;
        let gamesPlayed: number = statistics.gamesPlayed + 1;
        let gamesWon: number = statistics.gamesWon + 1;
        let guessRowTotalWon: number = statistics.guesses[guessRow] + 1;
        setStatistics((statistics: any) => ({
          ...statistics,
          gamesPlayed: gamesPlayed,
          gamesWon: gamesWon,
          guesses: {
            ...statistics.guesses,
            [guessRow]: guessRowTotalWon
          }
        }));
        window.localStorage.setItem('notWordle-reload', JSON.stringify(true));
        
        return;
      } else {
        if(currentRow >= 5) {
          setIsGameOver(true);
          showMessage(`${wordle}`, true);
          let gamesPlayed: number = statistics.gamesPlayed + 1;
          let gamesFailed: number = statistics.guesses.fail + 1;
          console.log(gamesFailed);
          setStatistics((statistics: any) => ({
            ...statistics,
            gamesPlayed: gamesPlayed,
            guesses: {
              ...statistics.guesses,
              fail: gamesFailed
            }
          }));
        }

        if(currentRow < 5){
          setCurrentRow(currentRow + 1);
          setCurrentTile(0);
        }
      }

    }
  }

  const showMessage = (message: string, keep?: boolean) => {
    setMessage(message);
    if(!keep) setTimeout(() => setMessage(''), 3000);
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
      }, 400 * index);
    })
  }

  // load anytime
      // check if has storage ? setState : nothing
  // play first game
      // set storage
      // set refresh to true


  const checkLocalStorage = () => {
    // window.localStorage.clear();
    let storage = window.localStorage.getItem('notWordle-statistics');
    let reload = window.localStorage.getItem('notWordle-reload');
    if(storage && reload){
      setStatistics(JSON.parse(storage));
    }
  }

  


  useEffect(() => {
    if(isGameOver && wordle !== '') window.localStorage.setItem('notWordle-statistics', JSON.stringify(statistics));
  }, [statistics, isGameOver, wordle]);


  useEffect(() => {
    const onKeyUp = (e: any) => {
      if (e.keyCode >= KeyCodes.A && e.keyCode <= KeyCodes.Z) {
        handleKeyInput(e.key.toUpperCase())
        return;
      } else if (e.keyCode === KeyCodes.Backspace) {
        deleteLetter();
        return;
      } else if (e.keyCode === KeyCodes.Enter) {
        checkRow();
        return;
      }
    };

    window.addEventListener("keyup", onKeyUp);

    return () => window.removeEventListener("keyup", onKeyUp);
  }, [checkRow, currentTile, deleteLetter, handleKeyInput]);
    

  const getTheWord = () => {
    const button = document.getElementById('StartGame');
    const word: string = getWord();
    console.log(word);
    setWorld(word);
    setIsGameOver(false);
    setMessage('');
    setCurrentRow(0);
    setCurrentTile(0);
    guessRows = resetGuessRows();
    resetBoard();
    checkLocalStorage();
    button?.blur();
  }

  return (
    <div className="game-container">
      <div className="title-container">
        <h1>Not Wordle</h1>
        <button id="StartGame" className="button" onClick={getTheWord}>Start Game</button>
      </div>

      <Message message={message} />

      <Tiles guessRows={guessRows} />
      
      <Keys keys={keys} handleKeyInput={(keyVal: string) => handleKeyInput(keyVal)} />
      

    </div>
  );
});

export default Game;
