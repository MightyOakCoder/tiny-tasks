import React from 'react';
import * as ordersAPI from '../../utilities/orders-api';
import './TaskList.css';
import { Link } from 'react-router-dom';
import TotalList from '../../components/TotalList/TotalList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function TaskList({ user, setUser, totalTasks, activeCat, setActiveCat, categoriesRef, setCart, cart, navigate }) {

  async function handleAddToOrder(taskId) {
    // 1. Call the addItemToCart function in ordersAPI, passing to it the itemId, and assign the resolved promise to a variable named cart.
    const updatedCart = await ordersAPI.addToCart(taskId);
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

