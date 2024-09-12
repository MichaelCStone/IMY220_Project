import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/playlists">Playlists</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    // <Router>
    //   <div>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/posts" element={<Posts />} />
    //     </Routes>
    //   </div>
    // </Router>
    );
  }
}

export default Header;