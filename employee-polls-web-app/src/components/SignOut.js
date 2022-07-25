import React from 'react';
import { useNavigate} from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';



const SignOut = (props) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/sign-in');
  }, []);
  props.dispatch(setAuthedUser(null));
  localStorage.clear();
  sessionStorage.clear();
};
  
export default connect()(SignOut);