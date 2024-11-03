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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-gray-900">
          <h2 className="text-4xl font-extrabold text-center mb-6">Login to Groovella</h2>
          <LoginForm onLogin={this.handleLogin} />
        </div>
      </div>
    );
  }
}

export default LoginPage;