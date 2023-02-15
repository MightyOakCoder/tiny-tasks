import React, { useState, useEffect, useRef } from 'react';
import * as tasksAPI from '../../utilities/tasks-api';
import * as ordersAPI from '../../utilities/orders-api';
import './TaskList.css';
import { Link, useNavigate } from 'react-router-dom';
import TotalList from '../../components/TotalList/TotalList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function TaskList({ user, setUser, totalTasks, activeCat, setActiveCat, categoriesRef }) {
  // const [totalTasks, setTotalTasks] = useState([]);
  // console.log(totalTasks)
  // const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  // // Obtain a ref object
  // const categoriesRef = useRef([]);
  const navigate = useNavigate();

  // useEffect(function() {
  //   console.log('NewOrderPage rendered');
  // });
 
  // useEffect(function() {
  //   async function getTasks() {
  //     const tasks = await tasksAPI.getAll();
  //     categoriesRef.current = tasks.reduce((cats, task) => {
  //       const cat = task.category.age;
  //       return cats.includes(cat) ? cats : [...cats, cat]
  //     }, []);
  //     setActiveCat(categoriesRef.current[1]);
  //     setTotalTasks(tasks);
  //   }
  //   getTasks();

  //   // Load the user's cart (the unpaid order for that user)
  //   async function getCart() {
  //     const cart = await ordersAPI.getCart();
  //     setCart(cart);
  //   }
  //   getCart();
  // }, []);
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
    <main className="TaskList">
      <aside>
          <CategoryList
            categories={categoriesRef.current}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
          />
        <Link to="/tasks/new" className="button btn-sm">+ ADD A NEW TASK</Link>
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <TotalList
        totalTasks={totalTasks.filter(task => task.category.age === activeCat)}
        handleAddToOrder={handleAddToOrder}
      />
      <OrderDetail
        order={cart}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  );
}

