import React, { useState } from "react";
import './NewTaskPage.css';

export default function NewTaskForm({ setTotalTasks }) {
  const [newTask, setNewTask] = useState({
    chore: "",
    category: "",
    points: 2
  });

  function handleChange(evt) {
    console.log(evt)
    setNewTask({ ...newTask, [evt.target.name]:evt.target.value });
  }

  function handleAddTask(evt) {
    evt.preventDefault();
    setTotalTasks((prev) => {
     return [...prev, newTask]
    });
    setNewTask({ chore: "", category: "", points: 2 });
  
    fetch('/new', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
  });
}

  return (
    <div className="NewTaskPage">
      <form onSubmit={handleAddTask}>
        <label>Task</label>
        <input
          type="text"
          name="chore"
          onChange={handleChange}
          value={newTask.chore}
          placeholder=""
        />
        <br/>
        <label>Age Range</label>
        <select
          name="category"
          defaultValue=""
          onChange={handleChange}
          value={newTask.category}
        >
          <option value={2}>2+</option>
          <option value={4}>4+</option>
          <option value={6}>6+</option>
          <option value={8}>8+</option>
          <option value={10}>10+</option>
          <option value={12}>12+</option>
        </select>
        <br/>
        <label>Points</label>
        <select
          name="points"
          defaultValue=""
          onChange={handleChange}
          value={newTask.points}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
        <br/>
        <input type="submit" />
      </form>
    </div>
  );
}