import React, { FunctionComponent } from "react";
import "./Tile.scss";

interface ITileProps {
  guessRowIndex: number;
  guessIndex: number;
}

const Tile: FunctionComponent<ITileProps> = ({
  guessRowIndex,
  guessIndex
}) => {
  return (
    <div id={`guessRow-` + guessRowIndex + `-tile-` + guessIndex} className="tile"></div>
  );
};

export default Tile;
