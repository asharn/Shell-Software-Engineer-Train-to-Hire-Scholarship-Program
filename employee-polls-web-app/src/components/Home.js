import React from 'react';
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

  
const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}
    >
      <h1>Welcome to Home page of Employee Polls</h1>
    </div>
  );
};
  
const mapStateToProps = ({ authedUser }) => ({
  authedUser,
  userLoggedIn: authedUser !== null,
});
export default withRouter(connect(mapStateToProps)(Home));