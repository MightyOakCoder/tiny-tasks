import React, { useState } from "react";
import './NewTaskPage.css';
import { getToken } from '../../utilities/users-service';
import * as tasksAPI from '../../utilities/tasks-api';
import { Link, useNavigate } from 'react-router-dom';



export default function NewTaskForm({ setTotalTasks }) {

  const navigate = useNavigate()
  
 const [newTask, setNewTask] = useState({
    chore: "",
    category: "",
    points: 2
  });

  async function handleAddTask(evt) {
    evt.preventDefault();
    setTotalTasks((prev) => {
     return [...prev, newTask]
    });
    // setNewTask({ chore: "sweep", category: {age: '2+', sortOrder: 10}, points: 2 });
    console.log(newTask)
    const result = await tasksAPI.newTask(newTask)
    console.log(result)
    navigate("/tasks")
  }

  function handleChange(evt) {
    console.log(evt)
    setNewTask({ ...newTask, [evt.target.name]:evt.target.value });
  }

  function selectFunction(){  
    var x=0;   
    for(x=0;x<5;x++){
    var option = "<option value='" + x + "'>Label " + x + "</option>"
    document.getElementById('categoryId').innerHTML += option;   
    } 
}   
  return (
    <div className="NewTaskPage">
      <form>
        <label>Task</label>
        <input
          type="text"
          name="chore"
          onChange={handleChange}
          value={newTask.chore}
          placeholder=""
        />
        <label>Category</label>
        <select
          id="categoryId"
          name="category"
          defaultValue=""
          onChange={handleChange}
          value={newTask.category}
        >
          <option value={"63eefab6fbba5d8d471b20a2"}>2+</option>
          <option value={"63eefab6fbba5d8d471b20a3"}>4+</option>
          <option value={"63eefab6fbba5d8d471b20a4"}>6+</option>
          <option value={"63eefab6fbba5d8d471b20a5"}>8+</option>
          <option value={"63eefab6fbba5d8d471b20a6"}>10+</option>
          <option value={"63eefab6fbba5d8d471b20a7"}>12+</option>
        </select>
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
        <button onClick={handleAddTask}>Add New Task</button>
      </form>
    </div>
  );
}