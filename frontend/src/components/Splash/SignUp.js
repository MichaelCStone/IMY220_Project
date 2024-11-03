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
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center" >Sign Up</h2>
        <form onSubmit={this.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} required className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"/>
            {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email:</label>
            <input type="email" name="email" value={email} onChange={this.handleChange} required className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"/>
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} required className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"/>
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password:</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} required className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"/>
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium">Name:</label>
            <input type="text" name="name" value={name} onChange={this.handleChange} required className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"/>
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium">Bio:</label>
            <textarea name="bio" value={bio} onChange={this.handleChange} maxLength={150} className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"/>
            {errors.bio && <span className="text-red-500 text-xs">{errors.bio}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium">Country:</label>
            <input type="text" name="country" value={country} onChange={this.handleChange} required className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"/>
            {errors.country && <span className="text-red-500 text-xs">{errors.country}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium">Profile Picture:</label>
            <input type="file" accept="image/*" onChange={this.handleFileChange} className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"/>
            {profilePicture && <span className="text-red-500 text-xs">{profilePicture.name}</span>}
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-indigo-500 text-black rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;