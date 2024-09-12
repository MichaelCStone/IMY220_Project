//Michael Stone - u21497682
import React, { Component } from 'react';

class SignUpForm extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder for sign-up functionality
    console.log('Sign-up details:', this.state);
  };

  render() 
  {
    return (
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />
          </div>

          <div>
            <label>Email:</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
          </div>

          <div>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
          </div>

          <div>
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} required />
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;