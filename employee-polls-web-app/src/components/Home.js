import React from 'react';
import { connect } from "react-redux";

const Home = () => {
  return (
    <div
      style={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh',
        direction: 'column'
      }}
    >
      <h1>Welcome to Home page of Employee Polls. </h1>
      <h2>This is public page, so no need to sign in. Anyone can visit.</h2>
    </div>
  );
};
  
const mapStateToProps = ({ authedUser }) => ({
  authedUser,
  userLoggedIn: authedUser !== null,
});
export default connect(mapStateToProps)(Home);