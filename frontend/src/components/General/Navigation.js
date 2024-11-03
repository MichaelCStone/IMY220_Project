import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const userProfile = localStorage.getItem('userProfile');
// console.log(userProfile);
// const userId = userProfile.simpleId;
let userId = null;
let username = null;

if (userProfile) 
{
  try 
  {
    const parsedProfile = JSON.parse(userProfile);
    username = parsedProfile.username; // Access the `simpleId` from the parsed profile
  } 
  catch (error) 
  {
    console.error('Error parsing user profile from localStorage:', error);
  }
}

class Header extends Component 
{
  render() 
  {
    return (
      <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4 flex justify-between items-center shadow-lg text-white">
        <div className="text-2xl font-bold">
          <Link to="/home" className="hover:text-yellow-300 transition duration-300">
            Groovella
          </Link>
        </div>

        <div className="flex space-x-6">
          <Link
            to="/home"
            className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 transition duration-300"
          >
            Home
          </Link>
          <Link
            to={`/profile/${username}`}
            className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 transition duration-300"
          >
            Profile
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;