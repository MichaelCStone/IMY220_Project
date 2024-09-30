// import React, { Component } from 'react';
// import LoginForm from '../components/Splash/LoginForm'; // Adjust the import path if needed
// import SignUpForm from '../components/Splash/SignUp'; // Adjust the import path if needed

// class SplashPage extends Component 
// {
//   render()
//   {
//     return (
//       <div className="splash-page">
//         <h1>Welcome to Groovella</h1>
//         <div className="form-container">
//           <div className="login-section">
//             <LoginForm />
//           </div>
//           <div className="signup-section">
//             <SignUpForm />
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

// export default SplashPage;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SplashPage extends Component 
{
  render() 
  {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Welcome to Groovella</h1>
        <p>Discover and share your favorite playlists.</p>
        <div>
          <Link to="/login">
            <button style={{ marginRight: '10px' }}>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default SplashPage;