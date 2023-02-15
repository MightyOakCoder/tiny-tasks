import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
// import TaskListItem from '../../pages/TaskListItem/TaskListItem';
import TaskList from '../../pages/TaskList/TaskList';
import TaskHistoryPage from '../../pages/TaskHistoryPage/TaskHistoryPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      { user ?
        <Routes>
          {/* client-side route that renders the component instance if the path matches the url in the address bar */}
          <Route path="/tasks" element={<TaskList user={user} setUser={setUser} />} />
          <Route path="/tasks/new" element={<TaskHistoryPage />} />
          {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
          <Route path="/*" element={<Navigate to="/tasks/new" />} />
        </Routes>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

