import NavBar from './NavBar';
import { useEffect, Fragment } from "react";
//import { connect } from "react-redux";
//import { handleInitialData } from "../actions/shared";
import LeaderBoard from "./LeaderBoard";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import NewPoll from "./NewPoll";
//import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";

const App = (props) => {
  // useEffect(() => {
  //   props.dispatch(handleInitialData());
  // }, []);

  return (
      <div className="container">
        <NavBar />
          <Routes>
            <Route path='/' exact component={Home} />
            <Route path='/leader-board' component={LeaderBoard} />
            <Route path='/new' component={NewPoll} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/sign-in' component={SignIn} />
          </Routes>
      </div>
  );
};

// const mapStateToProps = ({ authedUser }) => ({
//    loading: authedUser === null,
// });
//export default connect(mapStateToProps)(App);
export default App;