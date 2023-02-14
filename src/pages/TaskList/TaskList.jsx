import React, { useState, useEffect, useRef } from 'react';
import * as tasksAPI from '../../utilities/tasks-api';
import * as ordersAPI from '../../utilities/orders-api';
import './TaskList.css';
import { useNavigate } from 'react-router-dom';
import TotalList from '../../components/TotalList/TotalList';
import AgeRangeList from '../../components/AgeRangeList/AgeRangeList';
import TaskDetail from '../../components/TaskDetail/TaskDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function TaskList({ user, setUser }) {
  const [totalTasks, settotalTasks] = useState([]);
  const [activeAge, setActiveAge] = useState('');
  const [cart, setCart] = useState(null);
  // Obtain a ref object
  const ageRangesRef = useRef([]);
  const navigate = useNavigate();

  // useEffect(function() {
  //   console.log('NewOrderPage rendered');
  // });
  
  useEffect(function() {
    async function getTasks() {
      const tasks = await tasksAPI.getAll();
      ageRangesRef.current = tasks.reduce((ages, task) => {
        const age = task.ageRange.task;
        return ages.includes(age) ? ages : [...ages, age]
      }, []);
      setActiveAge(ageRangesRef.current[1]);
      settotalTasks(tasks);
    }
    getTasks();

    // Load the user's cart (the unpaid order for that user)
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);
  // the empty dependency array above will result in 
  // the function running after the FIRST render
  // only

  /*--- Event Handlers ---*/

  async function handleAddToOrder(taskId) {
    // 1. Call the addItemToCart function in ordersAPI, passing to it the itemId, and assign the resolved promise to a variable named cart.
    const updatedCart = await ordersAPI.addTaskToCart(taskId);
    // 2. Update the cart state with the updated cart received from the server
    setCart(updatedCart);
  }

  async function handleChangeQty(taskId, newQty) {
    const updatedCart = await ordersAPI.setTaskQtyInCart(taskId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }

  return (
    <main className="NewOrderPage">
      <aside>
          <AgeRangeList
          ageRanges={ageRangesRef.current}
          activeAge={activeAge}
          setActiveAge={setActiveAge}
        />
        {/* <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link> */}
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <TotalList
        totalTasks={totalTasks.filter(task => task.ageRange.task === activeAge)}
        handleAddToOrder={handleAddToOrder}
      />
      <TaskDetail
        order={cart}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  );
}

