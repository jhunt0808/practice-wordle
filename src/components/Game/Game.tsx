import React, { useEffect, useState } from "react";
import { Guesses, KeyCodes, Statistics } from '../../types/types';
import { keys } from '../../utils/keys';
import { getWord, defaultGuessRows, defaultStatistics, isInWordList, resetGuessRows, resetBoard } from '../../utils/magic';
import Keys from "../Keys/Keys";
import Message from "../Message/Message";
import GameModal from "../GameModal/GameModal";
import Tiles from "../Tiles/Tiles";
import "./Game.scss";

const Game = React.memo(() => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [wordle, setWorld] = useState<string>('');
  const [wordsUsed, setWordsUsed] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentTile, setCurrentTile] = useState<number>(0);
  const [statistics, setStatistics] = useState<any>(defaultStatistics);
  const [showModal, setShowModal] = useState<boolean>(true);

  let guessRows = defaultGuessRows;

  const updateStatisticsState = (didWin: boolean) => {
    let gamesPlayed: number = statistics.gamesPlayed + 1;
    let currentStreak: number = didWin ? statistics.currentStreak + 1 : 0;
    let gamesFailed: number = didWin ? statistics.guesses.fail : statistics.guesses.fail + 1;
    let gamesWon: number = didWin ? statistics.gamesWon + 1 : statistics.gamesWon;
    let winPercentage: number = gamesWon / gamesPlayed;
    let maxStreak: number = currentStreak > statistics.maxStreak ? currentStreak : statistics.maxStreak;

    if(didWin){
      let guessRow: number = currentRow + 1;
      let guessRowTotalWon: number = statistics.guesses[guessRow] + 1;
      
      setStatistics((statistics: any) => ({
        ...statistics,
        currentStreak,
        gamesPlayed,
        gamesWon,
        guesses: {
          ...statistics.guesses,
          [guessRow]: guessRowTotalWon
        },
        maxStreak,
        winPercentage,
        wordsUsed
      }));

    } else {

      setStatistics((statistics: any) => ({
        ...statistics,
        currentStreak,
        gamesPlayed: gamesPlayed,
        guesses: {
          ...statistics.guesses,
          fail: gamesFailed
        },
        winPercentage,
        wordsUsed
      }));
    }
  }

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
        setIsGameOver(true);
        updateStatisticsState(true);
        window.localStorage.setItem('notWordle-reload', JSON.stringify(true));
        setShowModal(true);
        return;
      } else {
        if(currentRow >= 5) {
          window.localStorage.setItem('notWordle-reload', JSON.stringify(true));
          setIsGameOver(true);
          updateStatisticsState(false);
          setShowModal(true);
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

  const checkLocalStorage = () => {
    let storage = window.localStorage.getItem('notWordle-statistics');
    let reload = window.localStorage.getItem('notWordle-reload');
    if(storage && reload){
      setStatistics(JSON.parse(storage));
    }
  }

  useEffect(() => {
    checkLocalStorage();
  }, [showModal]);

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
    setShowModal(false);
    const button = document.getElementById('StartGame');
    const word: string = getWord(wordsUsed);
    setWorld(word);
    setWordsUsed([...wordsUsed, word]);
    setIsGameOver(false);
    setMessage('');
    setCurrentRow(0);
    setCurrentTile(0);
    guessRows = resetGuessRows();
    resetBoard();
    button?.blur();
  }

  const closeModal = () => {
    setShowModal(false);
  }

  

  return (
    <div className="game-container">
      <div className="title-container">
        <h1>Not Wordle</h1>
      </div>

      <Message message={message} />

      <Tiles guessRows={guessRows} />
      
      <Keys keys={keys} handleKeyInput={(keyVal: string) => handleKeyInput(keyVal)} />

      {showModal && <GameModal 
                      statistics={statistics} 
                      isOpen={showModal}	
                      onRequestClose={closeModal} 
                      getTheWord={() => getTheWord()}
                      isGameOver={isGameOver}
                      theWord={wordle}/>}

    </div>
  );
});

export default Game;
