import * as usersService from '../../utilities/users-service';
import React from 'react';
export default function TaskHistoryPage() {

    async function handleCheckToken() {
      // Promise will resolve to a Date object
      const expDate = await usersService.checkToken();
      console.log(new Date(expDate));
    }
  
    return (
      <>
        <h1>TaskHistoryPage</h1>
        <button onClick={handleCheckToken}>Check When My Login Expires</button>
      </>
    );
  }