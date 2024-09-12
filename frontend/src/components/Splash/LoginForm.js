// Michael Stone - u21497682
import React, { Component } from 'react';

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

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Login details:', this.state);

    const { username, password, errors } = this.state;

    if (username.length >= 6 && password.length >= 8 && !errors.username && !errors.password) 
    {
      console.log("Login details:", { username, password }); //need to implement actual functionality

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
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;