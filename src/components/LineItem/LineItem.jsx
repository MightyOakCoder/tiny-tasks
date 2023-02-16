import React from 'react';
import './LineItem.css';

export default function LineItem({ lineItem, isDone, handleChangeQty }) {
  return (
    <div className="LineItem">
      <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr">{lineItem.task.chore}</span>
        <span>{lineItem.task.points.toFixed(0)}</span>
      </div>
      <div className="qty" style={{ justifyContent: isDone && 'center' }}>
        {!isDone &&
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(lineItem.task_id, lineItem.qty - 1)}
          >−</button>
          }
        <span>{lineItem.qty}</span>
        {!isDone &&
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(lineItem.task._id, lineItem.qty + 1)}
          >+</button>
        }
      </div>
      <div className="ext-price">{lineItem.extPrice.toFixed(0)}</div>
    </div>
  );
}