import React from 'react';
import './LineItem.css';

export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
  return (
    <div className="LineItem">
            <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr">{lineItem.task.task}</span>
        <span>{lineItem.task.points.toFixed(0)}</span>
      </div>
      <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
      </div>
      <div className="ext-price">{lineItem.extPrice.toFixed(0)}</div>
    </div>
  );
}