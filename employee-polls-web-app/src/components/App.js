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
import ForgotPassword from './ForgotPassword';

const App = (props) => {
  //const userLoggedIn = localStorage.getItem('userLoggedIn');
   useEffect(() => {
    if(props.userLoggedIn===false){
      props.dispatch(handleInitialData());
    }
   }, []);
    console.log('Component App userLoggedIn', props.userLoggedIn);
    console.log('Component App props', props);
    console.log('Component App localStorage userLoggedIn', localStorage.getItem('userLoggedIn'));
  return (
      <div className="container">
        <NavBar />
        {props.userLoggedIn ?  (
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/leaderboard' element={<LeaderBoard />} />
            <Route path='/add' element={<NewQuestion/>} />
            <Route path='/sign-up' element={<Home/>} />
            <Route path='/sign-in' element={<Home/>} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        ):
        (
          <Routes>
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/leaderboard' element={<NotAuthorized />} />
            <Route path='/add' element={<NotAuthorized/>} />
            <Route path='/' element={<NotAuthorized />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        )}
        <Copyright sx={{ mt: 4, backgroundColor: '#00A3FF', height: '60px', display: 'flex',  justifyContent: 'center',
        alignItems: 'center', }} />
      </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  userLoggedIn: authedUser !== null,
});
export default connect(mapStateToProps)(App);