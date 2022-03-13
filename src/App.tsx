import React, { FunctionComponent } from 'react';
import './App.scss';
import Game from './components/Game/Game';
import ReactGA from 'react-ga';


const App: FunctionComponent = () => {

	const TRACKING_ID = "G-7ZSXHC713G"; 
	ReactGA.initialize(TRACKING_ID, { standardImplementation: true });
  
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
