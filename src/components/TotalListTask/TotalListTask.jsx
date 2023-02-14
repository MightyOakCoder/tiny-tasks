import React from 'react';
import './TotalListTask.css';

export default function TotalListTask({ totalTask }) {
  return (
    <div className="TotalListTask">
      <div className="task">{totalTask.task}</div>
      <div className="points">
        <span>${totalTask.points.toFixed(2)}</span>
        <button className="btn-sm" onClick={() => console.log('clicked')}>
          ADD
        </button>
      </div>
    </div>
  );
}