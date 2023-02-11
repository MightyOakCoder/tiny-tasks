import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import './NewOrderPage.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import TaskList from '../../components/TaskList/TaskList';
import AgeRangeList from '../../components/AgeRangeList/AgeRangeList';
import ChildProfile from '../../components/ChildProfile/ChildProfile';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({ user, setUser }) {
  const [taskItems, setTaskItems] = useState([]);
  const [activeAge, setactiveAge] = useState('');
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
      ageRangeRef.current = tasks.reduce((ages, task) => {
        const age = task.ageRange.age;
        return ages.includes(age) ? ages : [...ages, age]
      }, []);
      setactiveAge(ageRangesRef.current[1]);
      setTaskItems(tasks);
    }
    getTasks();

    // Load the user's cart (the unpaid order for that user)
    async function getList() {
      const list = await ordersAPI.getList();
      setList(list);
    }
    getList();
  }, []);
  // the empty dependency array above will result in 
  // the function running after the FIRST render
  // only

  /*--- Event Handlers ---*/

  async function handleAddToChild(taskId) {
    // 1. Call the addItemToCart function in ordersAPI, passing to it the itemId, and assign the resolved promise to a variable named cart.
    const updatedList = await childrenAPI.addTaskToList(taskId);
    // 2. Update the cart state with the updated cart received from the server
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
    <main className="NewTaskPage">
      <aside>
        <Logo />
        <AgeRangeList
          categories={ageRangeRef.current}
          activeAge={activeAge}
          setActiveAge={setActiveAge}
        />
        <Link to="/children" className="button btn-sm">OLD TASKS</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <TaskList
        taskListItems={taskListItems.filter(task) => task.ageRange.age === activeAge)}
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