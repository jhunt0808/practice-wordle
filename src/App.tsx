import React from 'react';
import './App.scss';
import Game from './components/Game/Game';
import ReactGA from 'react-ga';
export default class App extends React.Component {
  

  componentDidMount() {
    ReactGA.initialize("G-7ZSXHC713G");
    ReactGA.pageview(window.location.pathname);
  }

  
  render() {

    

    return (
      <div className="App">
        <Game />
      </div>
    )};
}