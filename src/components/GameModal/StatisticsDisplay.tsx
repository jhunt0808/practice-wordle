import React, { FunctionComponent } from "react";
import { Statistics } from "../../types/types";
import "./StatisticsDisplay.scss";

interface IStatisticsDisplayProps {
statistics: Statistics;
}

const StatisticsDisplay: FunctionComponent<IStatisticsDisplayProps> = ({
	statistics
}) => {

  const getPercent = (perc: number): number => {
    let percent = perc * 100;
    return percent % 1 === 0 ? percent : Number(percent.toFixed(0));
  }

  return (
    <div className="statistics">
      <div className="statisticContainer">
        <div className="stat">{statistics.gamesPlayed}</div>
        <div className="label">Games<br />Played</div>
      </div>
      <div className="statisticContainer">
        <div className="stat">{getPercent(statistics.winPercentage)}%</div>
        <div className="label">Win %</div>
      </div>
      <div className="statisticContainer">
        <div className="stat">{statistics.currentStreak}</div>
        <div className="label">Current<br />Streak</div>
      </div>
      <div className="statisticContainer">
        <div className="stat">{statistics.maxStreak}</div>
        <div className="label">Max<br />Streak</div>
      </div>
    </div>
  );
};

export default StatisticsDisplay;
