import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
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
              Hello -authedUser PLACEHOLDER- -avatar PLACEHOLDER-
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
