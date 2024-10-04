//Michael Stone - u21497682
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SplashPage extends Component 
{
  render() 
  {
    return (
      // <div style={{ textAlign: 'center', padding: '50px' }}>
      //   <h1>Welcome to Groovella</h1>
      //   <p>Discover and share your favorite playlists.</p>
      //   <div>
      //     <Link to="/login">
      //       <button style={{ marginRight: '10px' }}>Login</button>
      //     </Link>
      //     <Link to="/signup">
      //       <button>Sign Up</button>
      //     </Link>
      //   </div>
      // </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">Welcome to Groovella</h1>
        <p className="text-xl font-light mb-10">Discover and share your favorite playlists.</p>
        
        <div className="flex space-x-6">
          <Link to="/login">
            <button className="transition-all duration-300 transform hover:scale-105 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg">
              Login
            </button>
          </Link>
          
          <Link to="/signup">
            <button className="transition-all duration-300 transform hover:scale-105 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default SplashPage;