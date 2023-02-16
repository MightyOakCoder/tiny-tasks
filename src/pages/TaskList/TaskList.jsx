import React from 'react';
import * as ordersAPI from '../../utilities/orders-api';
import './TaskList.css';
import { Link, useNavigate } from 'react-router-dom';
import TotalList from '../../components/TotalList/TotalList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function TaskList({ user, setUser, totalTasks, activeCat, setActiveCat, categoriesRef, cart, setCart }) {
  // const [totalTasks, setTotalTasks] = useState([]);
  // console.log(totalTasks)
  // const [activeCat, setActiveCat] = useState('');
  
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
   alert(`add task: ${taskId}`);
  }

  async function handleChangeQty(taskId, newQty) {
    const updatedCart = await ordersAPI.setTaskQtyInCart(taskId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }

  // async function handleDeleteTask(taskId) {
  //   setTasks(tasks.filter((t) => t.id !== taskId));
  // }

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

