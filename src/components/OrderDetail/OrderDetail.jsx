import React from 'react';
import './OrderDetail.css';
import LineItem from '../LineItem/LineItem';

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderDetail({ order, handleChangeQty, handleCheckout }) {
  if (!order) return null;

  const lineItems = order.lineItems.map(task =>
    <LineItem
      lineItem={task}
      isDone={order.isDone}
      handleChangeQty={handleChangeQty}
      // handleDeleteTask={handleDeleteTask}
      key={task._id}
    />
  );

  return (
    <div className="OrderDetail">
      <div className="section-heading">
        {order.isDone ?
          <span>ORDER <span className="smaller">{order.orderId}</span></span>
          :
          <span>NEW ORDER</span>
        }
        <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className="line-item-container flex-ctr-ctr flex-col scroll-y">
        {lineItems.length ?
          <>
            {lineItems}
            <section className="total">
              {order.isDone ?
                <span className="right">TOTAL&nbsp;&nbsp;</span>
                :
                <button
                  className="btn-sm"
                  onClick={handleCheckout}
                  disabled={!lineItems.length}
                >CHECKOUT</button>
              }
              <span>{order.totalQty}</span>
              <section className="total">
              <span>Total Tasks</span>
              <span className='total'>{order.totalQty}</span>
              <br/>
              <span>Total Points</span>
              <span className="total">{order.orderTotal.toFixed(0)}</span>
            </section>
              <span className="total">{order.orderTotal.toFixed(0)}</span>
            </section>
          </>
          :
          <div className="earnRewards">Earn Some Rewards</div>
        }
      </div>
    </div>
  );
}