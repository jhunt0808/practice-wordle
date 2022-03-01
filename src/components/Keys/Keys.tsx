import React, { FunctionComponent } from 'react';
import Key from './Key';
import './Keys.scss';

interface IKeysProps {
	keys: string[];
  handleKeyInput: (keyVal: string) => void;
}

const Keys: FunctionComponent<IKeysProps> = ({
	keys,
  handleKeyInput
}) => {

	return (
		<div className="key-container">
      {keys.map((key: string) => {
        return <Key keyVal={key} key={key} handleKeyInput={(keyVal: string) => handleKeyInput(keyVal)} />
      })}
    </div>
	);
}

export default Keys;