import React, { FunctionComponent } from 'react';
import './App.scss';
import Game from './components/Game/Game';
import { getWord } from './utils/magic';

const App: FunctionComponent = () => {

  console.log(getWord());
  
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Game />
    </div>
  );
}

export default App;
