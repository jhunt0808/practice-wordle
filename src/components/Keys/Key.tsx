import React, { FunctionComponent } from 'react';

interface IKeyProps {
	keyVal: string;
	handleKeyInput: (keyVal: string) => void;
}

const Key: FunctionComponent<IKeyProps> = ({
	keyVal,
	handleKeyInput
}) => {

	return (
		<button id={keyVal} onClick={() => handleKeyInput(keyVal)}>{keyVal}</button>
	);
}

export default Key;