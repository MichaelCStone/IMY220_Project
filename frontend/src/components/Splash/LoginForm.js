// Michael Stone - u21497682
import React, { Component } from 'react';
// import { Navigate } from 'react-router-dom';

// const thePort = process.env.PORT || 3000;
const thePort = 3000;

class LoginForm extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {
        username: '',
        password: ''
      }
      // ,redirectToHome: false // State variable for redirection
    };
  }

  handleChange = (event) => {
    // this.setState({ [event.target.name]: event.target.value });
    const { name, value } = event.target;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField = (name, value) => {
    let errors = this.state.errors;

    // Validation logic for each field
    switch (name) 
    {
      case 'username':
        errors.username = value.length < 6 ? 'Username must be at least 6 characters long' : '';
        break;

      case 'password':
        errors.password = value.length < 8 ? 'Password must be at least 8 characters long' : '';
        break;

      default:
        break;
    }

    this.setState({ errors });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Login details:', this.state);

    const { username, password, errors } = this.state;

    if (username.length >= 6 && password.length >= 8 && !errors.username && !errors.password) 
    {
      // console.log("Login details:", { username, password }); //need to implement actual functionality

      try 
      {
        const response = await fetch(`http://localhost:${thePort}/api/login`, { // Replace YOUR_PORT with your server port
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) 
        {
          // Handle successful login, e.g., save the user profile or redirect to home
          console.log('Login successful:', data.profile);

          // Save user profile to local storage
          localStorage.setItem('userProfile', JSON.stringify(data.profile));

          // Window.location.href = '/home';
          window.location.href = '/home';

          // You might want to call a prop function to set the user profile in the App component
          this.props.onLogin(data.profile);
        } 
        else 
        {
          // Handle errors, e.g., show an alert with the error message
          alert(data.message);
        }

      } 
      catch (error) 
      {
        console.error('Error during login:', error);

        alert('An error occurred. Please try again.');
      }

      this.setState({
        username: '',
        password: '',
        errors: {
          username: '',
          password: ''
        }
      });
    } 
    else 
    {
      alert("Please correct the errors before submitting.")
    }
  };

  render() 
  {
    const { username, password, errors } = this.state;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username:</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
              />
              {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
              />
              {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-black text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;