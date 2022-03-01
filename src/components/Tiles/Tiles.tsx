import React, { FunctionComponent } from "react";
import Tile from "./Tile";
import "./Tiles.scss";

interface ITilesProps {
  guessRows: string[][];
}

const Tiles: FunctionComponent<ITilesProps> = ({
  guessRows
}) => {

  return (
    <div className="tile-container">
      {guessRows.map((guessRow: Array<string>, guessRowIndex: number) => {
        return <div key={`guessRow-` + guessRowIndex} id={`guessRow-` + guessRowIndex}>
            {guessRow.map((guess: string, guessIndex: number) => {
              return <Tile key={`guessRow-` + guessRowIndex + `-tile-` + guessIndex} guessRowIndex={guessRowIndex} guessIndex={guessIndex} />
            })}
          </div>
      })}
    </div>
  );
};

export default Tiles;
