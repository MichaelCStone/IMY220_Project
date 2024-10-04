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
        <nav className="navbar" style={{ padding: '10px' }}>

            <Link to="/home" style={{ paddingRight: '10px' }}>Home</Link>

            <Link to="/playlist" style={{ paddingRight: '10px' }}>Playlists</Link>

            {/* <Link to="/profile/userId">Profile</Link> */}
            <Link to={`/profile/${username}`}>Profile</Link>
        </nav>
    );
  }
}

export default Header;