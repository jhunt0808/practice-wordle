import React, { FunctionComponent, useState, useRef, ChangeEvent } from "react";
import { Evaluation } from '../../types/types';
import "./Tile.scss";

interface ITileProps {
  guessRowIndex: number;
  guessIndex: number;
}

const Tile: FunctionComponent<ITileProps> = ({
  guessRowIndex,
  guessIndex
}) => {

  // const evaluateValue = (letter: string):string => {
  //   if(letter === "") {
  //     return Evaluation.NOPE;
  //   } else if(word.charAt(position) === letter) {
  //     return Evaluation.CORRECT;
  //   } else if (word.includes(letter)){
  //     return Evaluation.PRESENT;
  //   } else {
  //     return Evaluation.NOPE;
  //   }
  // }

  return (
    // <div className={`tile ${evaluateValue(letter)}`}>{letter}</div>
    <div id={`guessRow-` + guessRowIndex + `-tile-` + guessIndex} className="tile"></div>
  );
};

export default Tile;
