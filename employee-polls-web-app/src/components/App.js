import NavBar from './NavBar';
import { useEffect} from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LeaderBoard from "./LeaderBoard";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import { Routes, Route } from "react-router-dom";
import PageNotFound from './PageNotFound';
import NotAuthorized from './NotAuthorized';
import Copyright from './Copyright';
import ForgotPassword from './ForgotPassword';
import QuestionPage from './QuestionPage';
import DashBoard from './DashBoard';
import * as PathUrlConstants from '../utils/PathUrlConstants'

const App = (props) => {
  localStorage.clear();
   useEffect(() => {
    if(props.userLoggedIn===false){
      props.dispatch(handleInitialData());
    }
   }, []);
  return (
      <div className="container">
        <NavBar />
        {props.userLoggedIn ?  (
          <Routes>
            <Route path={PathUrlConstants.RootPathUrl} exact element={<Home />} />
            <Route path={PathUrlConstants.DashBoardUrl} element={<DashBoard />} />
            <Route path={PathUrlConstants.LeaderBoardUrl} element={<LeaderBoard />} />
            <Route path={PathUrlConstants.NewPollUrl} element={<NewQuestion/>} />
            <Route path={PathUrlConstants.QuestionWithIdUrl} element={<QuestionPage />} />
            <Route path={PathUrlConstants.SignUpUrl} element={<Home/>} />
            <Route path={PathUrlConstants.SignInUrl} element={<Home/>} />
            <Route path={PathUrlConstants.OtherThenMapUrl} element={<PageNotFound />} />
            <Route path={PathUrlConstants.ForgotPasswordUrl} element={<ForgotPassword />} />
            <Route path={PathUrlConstants.SignOutUrl} element={<SignOut/>} />
          </Routes>
        ):
        (
          <Routes>
            <Route path={PathUrlConstants.RootPathUrl} exact element={<Home />} />
            <Route path={PathUrlConstants.SignInUrl} element={<SignIn/>} />
            <Route path={PathUrlConstants.SignUpUrl} element={<SignUp/>} />
            <Route path={PathUrlConstants.DashBoardUrl} element={<NotAuthorized />} />
            <Route path={PathUrlConstants.LeaderBoardUrl} element={<NotAuthorized />} />
            <Route path={PathUrlConstants.SignOutUrl} element={<SignIn/>} />
            <Route path={PathUrlConstants.NewPollUrl} element={<NotAuthorized/>} />
            <Route path={PathUrlConstants.OtherThenMapUrl} element={<PageNotFound />} />
            <Route path={PathUrlConstants.ForgotPasswordUrl} element={<ForgotPassword />} />
          </Routes>
        )}
        <Copyright sx={{ mt: 4, backgroundColor: '#00A3FF', height: '60px', display: 'flex',  justifyContent: 'center',
        alignItems: 'center', }} />
      </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
  userLoggedIn: authedUser !== null,
});
export default connect(mapStateToProps)(App);