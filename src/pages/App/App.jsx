import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
// import TaskListItem from '../../pages/TaskListItem/TaskListItem';
import TaskList from '../../pages/TaskList/TaskList';
import NewTaskPage from '../NewTaskPage/NewTaskPage';
import * as tasksAPI from '../../utilities/tasks-api';


export default function App() {
  const [user, setUser] = useState(getUser());
  const categoriesRef = useRef([]);
  const [totalTasks, setTotalTasks] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
 
  useEffect(function() {
    async function getTasks() {
      const tasks = await tasksAPI.getAll();
      categoriesRef.current = tasks.reduce((cats, task) => {
        const cat = task.category.age;
        return cats.includes(cat) ? cats : [...cats, cat]
      }, []);
      setActiveCat(categoriesRef.current[1]);
      setTotalTasks(tasks);
    }
    getTasks();
  }, []);
  
  return (
    <main className="App">
      { user ?
        <Routes>
          {/* client-side route that renders the component instance if the path matches the url in the address bar */}
          <Route path="/tasks" element={
            <TaskList 
              user={user} 
              setUser={setUser} 
              totalTasks={totalTasks} 
              activeCat={activeCat} 
              setActiveCat={setActiveCat} 
              categoriesRef={categoriesRef} 
              cart={cart}
              setCart={setCart}
             />} 
          />
          <Route path="/tasks/new" element={<NewTaskPage totalTasks={totalTasks} setTotalTasks={setTotalTasks} />} />
          {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
          <Route path="/*" element={<Navigate to="/tasks/" />} />
        </Routes>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

