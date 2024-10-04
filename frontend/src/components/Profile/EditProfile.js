//Michael Stone - u21497682
import React, { Component } from 'react';

class EditProfile extends Component 
{
    constructor(props) 
    {
        super(props);

        // this.state = {
        //     name: props.profile.name,
        //     bio: props.profile.bio,
        //     country: props.profile.country,
        // };

        this.state = {
            name: props.profile.name,
            bio: props.profile.bio,
            country: props.profile.country,
            picture: props.profile.picture || '', // Handle case if no picture is set
            username: props.profile.username,
            email: props.profile.email,
            password: props.profile.password
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     this.props.onSave(this.state);
    // };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, name, bio, country, picture, email, password } = this.state;
    
        try {
            // Make the API call to update the profile
            const response = await fetch(`/api/profiles/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    bio,
                    country,
                    picture,
                    email,
                    password, // Include the password as well
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
    
            const updatedProfile = await response.json();
            this.props.onSave(updatedProfile); // Call onSave with the updated profile data
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('There was an error updating your profile. Please try again.'); // Show error to user
        }
    };

    // render() 
    // {
    //     return (
    //         <form onSubmit={this.handleSubmit}>
    //             <div>
    //                 <label>Name:</label>
    //                 <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
    //             </div>

    //             <div>
    //                 <label>Bio:</label>
    //                 <textarea name="bio" value={this.state.bio} onChange={this.handleChange} required />
    //             </div>

    //             <div>
    //                 <label>Country:</label>
    //                 <input type="text" name="country" value={this.state.country} onChange={this.handleChange} required />
    //             </div>

    //             <button type="submit">Save</button>
    //         </form>
    //     );
    // }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                </div>

                <div>
                    <label>Bio:</label>
                    <textarea name="bio" value={this.state.bio} onChange={this.handleChange} required />
                </div>

                <div>
                    <label>Country:</label>
                    <input type="text" name="country" value={this.state.country} onChange={this.handleChange} required />
                </div>

                <div>
                    <label>Picture URL:</label>
                    <input type="text" name="picture" value={this.state.picture} onChange={this.handleChange} />
                </div>

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
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>

                <button type="submit">Save</button>
            </form>
        );
    }
}

export default EditProfile;