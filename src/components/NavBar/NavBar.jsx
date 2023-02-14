import React from 'react';
import { Link } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {

  function handleLogOut() {
    usersService.logOut();
    setUser(null);
  }

  return (
    <nav>
      {/* <h1>Welcome {user.name}</h1> */}
      <Link to="/tasks">Tasks List</Link>
      &nbsp; | &nbsp;
      <Link to="/tasks/new">Add New Task</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}