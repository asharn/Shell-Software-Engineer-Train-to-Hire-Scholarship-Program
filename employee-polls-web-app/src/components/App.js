import NavBar from './NavBar';
import { useEffect} from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LeaderBoard from "./LeaderBoard";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import { Routes, Route } from "react-router-dom";
import PageNotFound from './PageNotFound';
import NotAuthorized from './NotAuthorized';
import Copyright from './Copyright';

const App = (props) => {
   useEffect(() => {
     props.dispatch(handleInitialData());
   }, []);
    console.log(props.userLoggedIn);
    console.log(props);
  return (
      <div className="container">
        <NavBar />
        {props.userLoggedIn !== true ?  (
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/leaderboard' exact element={<LeaderBoard />} />
            <Route path='/add' exact element={<NewQuestion/>} />
            <Route path='/sign-up' exact element={<SignUp/>} />
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        ):
        (
          <Routes>
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/sign-up' exact element={<SignUp/>} />
            <Route path='/leaderboard' exact element={<NotAuthorized />} />
            <Route path='/add' exact element={<NotAuthorized/>} />
            <Route path='/' exact element={<NotAuthorized />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
        <Copyright sx={{ mt: 4, mb: 10, backgroundColor: 'primary' }} />
      </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  userLoggedIn: authedUser !== null,
});
export default connect(mapStateToProps)(App);