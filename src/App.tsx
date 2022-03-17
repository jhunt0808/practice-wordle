import React from 'react';
import './App.scss';
import Game from './components/Game/Game';
import ReactGA from 'react-ga';
export default class App extends React.Component {
  
  render() {

    var host = window.location.hostname;
    if(host !== "localhost")
    {
      const TRACKING_ID = "G-7ZSXHC713G"; 
      ReactGA.initialize(TRACKING_ID,
       { debug:true, standardImplementation: true });
       ReactGA.pageview(window.location.pathname);
    }

    return (
      <div className="App">
        <Game />
      </div>
    )};
}