import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from "./actions/shared";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import NewQuestion from "./components/NewQuestion";
import LoadingBar from "react-redux-loading";
import Header from "./components/Header";
import Poll from "./components/Poll";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  const authedUser = useSelector(
    (state) => ({
      noAuthedUser: state.authedUser === null,
    }),
    shallowEqual
  );

  return (
    <Router>
      <Fragment>
        <LoadingBar
          style={{
            backgroundColor: "green",
            height: "20px",
            position: "fixed",
            top: "0",
          }}
        />
        {authedUser.noAuthedUser ? (
          <Route render={() => <Login />} />
        ) : (
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/questions/:id" component={Poll} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/leaderboard" component={Leaderboard} />
          </div>
        )}
      </Fragment>
    </Router>
  );
}

export default App;
