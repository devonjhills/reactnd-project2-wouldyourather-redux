import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./App.css";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import Nav from "./components/Nav";
import NewQuestion from "./components/NewQuestion";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="container">
          <Nav />
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/login" component={Login} />
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
