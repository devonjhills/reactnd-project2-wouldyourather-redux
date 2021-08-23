import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from "./actions/shared";
import "./App.css";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import Nav from "./components/Nav";
import NewQuestion from "./components/NewQuestion";
import LoadingBar from "react-redux-loading";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  const authedUser = useSelector(
    (state) => ({
      loading: state.authedUser === null,
    }),
    shallowEqual
  );

  const state = useSelector((state) => state)

  console.log('TESTING: ', state.authedUser);

  return (
    <Router>
      <Fragment>
        <LoadingBar />
        <div>
          {authedUser.loading === true ? null : (
            <div>
              <Nav />
              <Route path="/" exact component={Home} />
              <Route path="/add" component={NewQuestion} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/login" component={Login} />
            </div>
          )}
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
