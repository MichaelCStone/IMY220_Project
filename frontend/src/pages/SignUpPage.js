//Michael Stone - u21497682
import React, { Component } from 'react';
import SignUpForm from '../components/Splash/SignUp';

class SignUpPage extends Component 
{
  render() 
  {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up for Groovella</h2>
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default SignUpPage;