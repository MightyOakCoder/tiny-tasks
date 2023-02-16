import React from 'react';
import * as ordersAPI from '../../utilities/orders-api';
import './TaskList.css';
import { Link, useNavigate } from 'react-router-dom';
import TotalList from '../../components/TotalList/TotalList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import tLogo from '../../components/tLogo/tLogo';

export default function TaskList({ user, setUser, totalTasks, activeCat, setActiveCat, categoriesRef, cart, setCart }) {
  const navigate = useNavigate();

  async function handleAddToOrder(taskId) {
    console.log(taskId)
   const updatedCart = await ordersAPI.addTaskToCart(taskId);
   setCart(updatedCart);
  }

  async function handleDeleteTask(taskId) {
    const updatedCart = await ordersAPI.removeTaskFromCart(taskId);
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
        <tLogo />
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
        handleDeleteTask={handleDeleteTask}
      />
      <OrderDetail
        order={cart}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  );
}

