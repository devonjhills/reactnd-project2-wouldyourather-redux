import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = () => {

  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
          </li>
          <li>
              Hello {users[authedUser].name} 
              <img src={users[authedUser].avatarURL} alt='User Avatar' />
          </li>
          <li>
            <NavLink to="/login" activeClassName="active">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
