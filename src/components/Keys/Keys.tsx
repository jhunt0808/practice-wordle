import React, { FunctionComponent } from 'react';
import Key from './Key';
import './Keys.scss';

interface IKeysProps {
	keys: string[];
  handleClick: (keyVal: string) => void;
}

const Keys: FunctionComponent<IKeysProps> = ({
	keys,
  handleClick
}) => {

	return (
		<div className="key-container">
      {keys.map((key: string) => {
        return <Key keyVal={key} key={key} handleClick={(keyVal: string) => handleClick(keyVal)} />
      })}
    </div>
	);
}

export default Keys;