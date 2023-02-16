import React from 'react';
import './TotalListTask.css';

export default function TotalListTask({ totalTask, handleAddToOrder, handleDeleteTask }) {
    
    return (
    <div className="TotalListTask">
      <div className="chore">{totalTask.chore}</div>
      <div className="points">
        <span>{totalTask.points.toFixed(0)}</span>
        <button className="btn-sm" onClick={() => handleAddToOrder(totalTask._id)}>
          ADD
        </button>
        <button className="btn-sm" onClick={() => handleDeleteTask(totalTask._id)}>
          DELETE</button>
      </div>
    </div>
  );
}