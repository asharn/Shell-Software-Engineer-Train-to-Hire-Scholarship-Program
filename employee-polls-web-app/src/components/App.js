import NavBar from './NavBar';
import { useEffect} from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LeaderBoard from "./LeaderBoard";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import NewPoll from "./NewPoll";
import { Routes, Route } from "react-router-dom";

const App = (props) => {
   useEffect(() => {
     props.dispatch(handleInitialData());
   }, []);

  return (
      <div className="container">
        <NavBar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/leaderboard' exact element={<LeaderBoard />} />
            <Route path='/add' exact element={<NewPoll/>} />
            <Route path='/sign-up' exact element={<SignUp/>} />
            <Route path='/sign-in' element={<SignIn/>} />
          </Routes>
      </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  userLoggedIn: authedUser === null,
});
export default connect(mapStateToProps)(App);