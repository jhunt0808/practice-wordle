import React, { FunctionComponent } from "react";
import { Statistics } from "../../types/types";
import Modal from 'react-modal';
import "./GameModal.scss";

interface IModalProps {
	statistics: Statistics;
	isOpen: boolean;
	onRequestClose: () => void,
  getTheWord: () => void,
}


const GameModal: FunctionComponent<IModalProps> = ({
	statistics, isOpen, onRequestClose, getTheWord
}) => {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#121212',
      border: 'none',
      borderRadius: '10px',
      color: '#111111'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
	};

  Modal.setAppElement('#root');

  const getPercent = (perc: number): number => {
    return perc * 100;
  }

  return (
	  <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="statistics">
          <h3>Statistics</h3>
          <div>
            <div>Games Played: {statistics.gamesPlayed}</div>
            <div>Win Percentage: {getPercent(statistics.winPercentage)}%</div>
            <div>Current Streak: {statistics.currentStreak}</div>
            <div>Max Streak: {statistics.maxStreak}</div>
          </div>
          <button id="StartGame" className="button" onClick={getTheWord}>Start Game</button>
        </div>
        
      </Modal>
    </div>
  );
};

export default GameModal;
