import React, { FunctionComponent } from 'react';
import Key from './Key';
import './Keys.scss';

interface IKeysProps {
	keys: string[][];
  handleKeyInput: (keyVal: string) => void;
}

const Keys: FunctionComponent<IKeysProps> = ({
	keys,
  handleKeyInput
}) => {

  var rows: string[][] = keys;

	return (
		<div className="key-container">
      {rows.map((row: string[]) => {
        // eslint-disable-next-line array-callback-return
        return <div key={row[0]} className="keysRow">{row.map((key: string) => {
          return <Key keyVal={key} key={key} handleKeyInput={(keyVal: string) => handleKeyInput(keyVal)} />
        })}</div>
      })}

      {/* <>{rows.map((row: string[]) => {
        return <div></div>row.map((key: string) => {
          return {key}
        })
      })}</> */}
      {/* {keys.map((key: string[][]) => {
        return <Key keyVal={key} key={key} handleKeyInput={(keyVal: string) => handleKeyInput(keyVal)} />
      })} */}
    </div>
	);
}

export default Keys;