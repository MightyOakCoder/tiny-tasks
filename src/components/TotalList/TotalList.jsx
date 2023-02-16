import React from 'react';
import './TotalList.css';
import TotalListTask from '../TotalListTask/TotalListTask';

export default function TotalList({ totalTasks, handleAddToOrder, handleDeleteTask }) {
  const tasks = totalTasks.map(task =>
    <TotalListTask
      key={task._id}
      totalTask={task}
      handleAddToOrder={handleAddToOrder}
      handleDeleteTask={handleDeleteTask}
    />
  );
  return (
    <main className="TotalList">
      {tasks}
      
    </main>
  );
}