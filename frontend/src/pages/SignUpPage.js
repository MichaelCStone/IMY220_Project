//Michael Stone - u21497682
import React, { Component } from 'react';
import SignUpForm from '../components/Splash/SignUp';

class SignUpPage extends Component 
{
  render() 
  {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-gray-900">
          <h2 className="text-4xl font-extrabold text-center mb-6">Sign Up for Groovella</h2>
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default SignUpPage;