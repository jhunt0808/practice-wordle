import React, { FunctionComponent, useState, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./KeyboardWrapper.scss";

interface IProps {
  onChange: (input: string) => void;
  keyboardRef: MutableRefObject<typeof Keyboard>;
  correctLetters: string;
  placedWrongLetters: string;
  notUsedLetters: string;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onChange,
  keyboardRef,
  correctLetters,
  placedWrongLetters,
  notUsedLetters
}) => {
  const [layoutName, setLayoutName] = useState<string>("default");

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
  };

  return (
	<div>
    	<Keyboard
			keyboardRef={r => (keyboardRef.current = r)}
			layoutName={layoutName}
			layout={{
			default: [
				"Q W E R T Y U I O P",
				"A S D F G H J K L",
				"{enter} Z X C V B N M {backspace}",
			]
			}}
			display={{
				"{backspace}": "⌫",
			}}
      buttonTheme={[
        {
          class: "letters-correct",
          buttons: correctLetters
        },
        {
          class: "letters-wrong-position",
          buttons: placedWrongLetters
        },
        {
          class: "letters-not-used",
          buttons: notUsedLetters
        }
      ]}
			onChange={onChange}
			onKeyPress={onKeyPress}
			onRender={() => {}}
		/>
	</div>
  );
};

export default KeyboardWrapper;
