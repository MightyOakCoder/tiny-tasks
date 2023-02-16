import React from 'react';
import './TotalListTask.css';

export default function TotalListTask({ totalTask, handleAddToOrder }) {
    
    return (
    <div className="TotalListTask">
      <div className="task">{totalTask.chore}</div>
      <div className="points">
        <span>{totalTask.points.toFixed(0)}</span>
        <button className="btn-sm" onClick={() => handleAddToOrder(totalTask._id)}>
          ADD
        </button>
      </div>
    </div>
  );
}