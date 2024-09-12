import React, { Component } from 'react';
import LoginForm from '../components/Splash/LoginForm'; // Adjust the import path if needed
import SignUpForm from '../components/Splash/SignUp'; // Adjust the import path if needed

class SplashPage extends Component 
{
  render()
  {
    return (
      <div className="splash-page">
        <h1>Welcome to Groovella</h1>
        <div className="form-container">
          <div className="login-section">
            <LoginForm />
          </div>
          <div className="signup-section">
            <SignUpForm />
          </div>
        </div>
      </div>
    );
  }
};

export default SplashPage;