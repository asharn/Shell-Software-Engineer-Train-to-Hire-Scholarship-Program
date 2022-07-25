import React from 'react';
import { connect } from "react-redux";

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
      <h1>Welcome to Home page of Employee Polls. This is public page, so no need to sign in, anycan visit.</h1>
    </div>
  );
};
  
const mapStateToProps = ({ authedUser }) => ({
  authedUser,
  userLoggedIn: authedUser !== null,
});
export default connect(mapStateToProps)(Home);