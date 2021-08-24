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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  const authedUser = useSelector(
    (state) => ({
      authUserSet: state.authedUser === null,
    }),
    shallowEqual
  );

  return (
    <Router>
      <Fragment>
        {authedUser.authUserSet ? (
          <Route render={() => <Login />} />
        ) : (
          <Fragment>
            <LoadingBar
              style={{
                backgroundColor: "green",
                height: "5px",
                position: "fixed",
                top: "0",
              }}
            />

            {authedUser.authUserSet === true ? null : (
              <div>
                <Header />
                <Route exact path="/" component={Home} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    </Router>
  );
}

export default App;
