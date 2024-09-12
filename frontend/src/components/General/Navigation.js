import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <nav className="navbar" style={{ padding: '10px' }}>
            <Link to="/home" style={{ paddingRight: '10px' }}>Home</Link>
            <Link to="/playlist" style={{ paddingRight: '10px' }}>Playlists</Link>
            <Link to="/profile">Profile</Link>
        </nav>
    );
  }
}

export default Header;