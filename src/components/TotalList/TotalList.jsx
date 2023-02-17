import React, {useRef, useState, useEffect} from 'react';
import './TotalList.css';
import TotalListTask from '../TotalListTask/TotalListTask';
import * as tasksAPI from '../../utilities/tasks-api';

export default function TotalList({ handleAddToOrder, handleDeleteTask }) {
    const [totalTasks, setTotalTasks] = useState([]);
    const categoriesRef = useRef([]);
    const [activeCat, setActiveCat] = useState('');

  useEffect(function() {
    async function getTasks() {
      const tasks = await tasksAPI.getAll();
      console.log(tasks)
      categoriesRef.current = tasks.reduce((cats, task) => {
        const cat = task.category.age;
        return cats.includes(cat) ? cats : [...cats, cat]
      }, []);
      setActiveCat(categoriesRef.current[1]);
      setTotalTasks(tasks);
    }
    getTasks();
  }, []);
  
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