import React from 'react';
import './App.scss';
import Game from './components/Game/Game';
import ReactGA from 'react-ga4';
export default class App extends React.Component {
  

  componentDidMount() {
    ReactGA.initialize("G-7ZSXHC713G", {testMode: true});
    ReactGA.event("page_view", {page: window.location.pathname });
  }

  
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    )};
}