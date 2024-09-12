// Michael Stone - u21497682
import React, { Component } from 'react';

class LoginForm extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder for login functionality
    console.log('Login details:', this.state);
  };

  render() 
  {
    return (
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />
          </div>

          <div>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;