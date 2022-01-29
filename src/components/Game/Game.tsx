import React, { FunctionComponent, useState, useRef, ChangeEvent } from "react";
import KeyboardWrapper from "../Keyboard/KeyboardWrapper";

const Game: FunctionComponent = () => {
  const [input, setInput] = useState("");
  const keyboard = useRef<any>(null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <div>
      <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={e => onChangeInput(e)}
      />
      <KeyboardWrapper 
        keyboardRef={keyboard} 
        onChange={setInput}
        correctLetters="A B C"
        placedWrongLetters="D E F"
        notUsedLetters="G H I"
      />
    </div>
  );
};

export default Game;
