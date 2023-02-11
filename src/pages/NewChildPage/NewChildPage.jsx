import React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as tasksAPI from '../../utilities/tasks-api';
import * as childrenAPI from '../../utilities/children-api';
import './NewChildPage.css';
import { Link, useNavigate } from 'react-router-dom';
// import Logo from '../../components/Logo/Logo';
import TaskList from '../../components/TaskList/TaskList';
import AgeRangeList from '../../components/AgeRangeList/AgeRangeList';
import ChildProfile from '../../components/ChildProfile/ChildProfile';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewChildPage({ user, setUser }) {
  const [taskListItems, setTaskListItems] = useState([]);
  const [activeAge, setActiveAge] = useState('');
  const [list, setList] = useState(null);
  // Obtain a ref object
  const ageRangesRef = useRef([]);
  const navigate = useNavigate();

  // useEffect(function() {
  //   console.log('NewOrderPage rendered');
  // });

  useEffect(function () {
    async function getTasks() {
      const tasks = await tasksAPI.getAll();
      ageRangesRef.current = tasks.reduce((ages, task) => {
        const age = task.ageRange.age;
        return ages.includes(age) ? ages : [...ages, age]
      }, []);
      setActiveAge(ageRangesRef.current[1]);
      setTaskListItems(tasks);
    }
    getTasks();

    // Load the user's cart (the unpaid order for that user)
    async function getList() {
      const list = await childrenAPI.getList();
      setList(list);
    }
    getList();
  }, []);
  // the empty dependency array above will result in 
  // the function running after the FIRST render
  // only

  /*--- Event Handlers ---*/

  async function handleAddToChild(taskId) {
    const updatedList = await childrenAPI.addTaskToList(taskId);
    setList(updatedList);
  }

  async function handleChangeQty(taskId, newQty) {
    const updatedList = await childrenAPI.setTaskQtyInList(taskId, newQty);
    setList(updatedList);
  }

  async function handleCheckout() {
    await childrenAPI.checkout();
    navigate('/children');
  }

  return (
    <main className="NewChildPage">
      <aside>
        {/* <Logo /> */}
        <AgeRangeList
          AgeRanges={ageRangesRef.current}
          activeAge={activeAge}
          setActiveAge={setActiveAge}
        />
        <Link to="/children" className="button btn-sm">OLD TASKS</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <TaskList
        taskListItems={taskListItems.filter(task => task.ageRange.age === activeAge)}
        handleAddToChild={handleAddToChild}
      />
      <ChildProfile
        child={list}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  );
}