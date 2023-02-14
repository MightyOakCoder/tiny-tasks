import React from 'react';
import './AgeRangeList.css';

export default function AgeRangeList({ ageRanges, activeAge, setActiveAge }) {
  const ages = ageRanges.map(age =>
    <li
      key={age}
      className={age === activeAge ? 'active' : ''}
      // FYI, the below will also work, but will give a warning
      // className={cat === activeCat && 'active'}
      onClick={() => setActiveAge(age)}
    >
      {age}
    </li>
  );
  return (
    <ul className="AgeRangeList">
      {ages}
    </ul>
  );
}