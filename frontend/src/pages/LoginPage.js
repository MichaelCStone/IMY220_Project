//Michael Stone - u21497682
import React, { Component } from 'react';
import LoginForm from '../components/Splash/LoginForm';

class LoginPage extends Component 
{
  handleLogin = (profile) => {
    // Handle setting the user profile in your App state
    console.log('User logged in:', profile);
    // You might want to redirect or update the state in your App component
  };

  render() 
  {
    return (
      <div>
        <LoginForm onLogin={this.handleLogin}/>
      </div>
    );
  }
}

export default LoginPage;