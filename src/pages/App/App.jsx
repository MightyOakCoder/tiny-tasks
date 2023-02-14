import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
// import TaskListItem from '../../pages/TaskListItem/TaskListItem';
import TaskList from '../../pages/TaskList/TaskList';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  // function addTask(newTask) {
  //   setTasks([...tasks, newTask]);
  // }

  const [user, setUser] = useState(getUser());
  const [tasks, setTasks] = useState([]);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
        <h1>Welcome!</h1>
        <TaskList tasks={tasks} />
    </main>
  );
}

