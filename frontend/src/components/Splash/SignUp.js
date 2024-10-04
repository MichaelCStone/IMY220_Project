//Michael Stone - u21497682
import React, { Component } from 'react';

const thePort = 3000;

class SignUpForm extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      bio: '',
      country: '',
      profilePicture: null,
      followers: [],
      following: [],
      playlists: [],
      errors: {
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        bio: '',
        country: ''
      }
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    // Update state and validate field
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

      case 'email':
        errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email is not valid';
        break;

      case 'password':
        errors.password = value.length < 8 ? 'Password must be at least 8 characters long' : '';
        break;

      case 'confirmPassword':
        errors.confirmPassword = value !== this.state.password ? 'Passwords do not match' : '';
        break;

      case 'name':
        errors.name = value.trim() === '' ? 'Name is required' : '';
        break;

      case 'bio':
        errors.bio = value.length > 150 ? 'Bio must be 150 characters or less' : '';
        break;

      case 'country':
        errors.country = value.trim() === '' ? 'Country is required' : '';
        break;

      default:
        break;
    }

    this.setState({ errors });
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ profilePicture: file });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, name, bio, country, profilePicture, errors, followers, following, playlists } = this.state;

    // Check if form is valid
    if (username.length >= 6 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 8) 
    {
        if (!errors.username && !errors.email && !errors.password) 
        {
            try 
            {
                const response = await fetch(`http://localhost:${thePort}/api/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        name,
                        bio,
                        country,
                        profilePicture,
                        followers,
                        following,
                        playlists,
                    }),
                });

                const data = await response.json();

                if (response.ok) 
                {
                    console.log('Sign-up successful:', data);
                    // Optionally redirect to another page or clear the form

                    localStorage.setItem('userProfile', JSON.stringify(data.profile));

                    window.location.href = '/home';
                } 
                else 
                {
                    alert(data.error); // Display the error from the API
                }
            } 
            catch (error) 
            {
                console.error('Error during sign-up:', error);
                alert('An error occurred while signing up.');
            }
        } 
        else 
        {
            alert('Please correct the errors before submitting.');
        }
    } 
    else 
    {
        alert('Please correct the errors before submitting.');
    }
  };

  render() {
    const { username, email, password, confirmPassword, name, bio, country, profilePicture, errors } = this.state;

    return (
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} required />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={this.handleChange} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} required />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div>
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} required />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <div>
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={this.handleChange} required />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div>
            <label>Bio:</label>
            <textarea name="bio" value={bio} onChange={this.handleChange} maxLength={150} />
            {errors.bio && <span className="error">{errors.bio}</span>}
          </div>

          <div>
            <label>Country:</label>
            <input type="text" name="country" value={country} onChange={this.handleChange} required />
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          <div>
            <label>Profile Picture:</label>
            <input type="file" accept="image/*" onChange={this.handleFileChange} />
            {profilePicture && <span className="file-name">{profilePicture.name}</span>}
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;