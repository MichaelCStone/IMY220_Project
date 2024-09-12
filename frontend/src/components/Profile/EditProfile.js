//Michael Stone - u21497682
import React, { Component } from 'react';

class EditProfile extends Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            name: props.user.name,
            bio: props.user.bio,
            country: props.user.country,
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSave(this.state);
    };

    render() 
    {
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

                <button type="submit">Save</button>
            </form>
        );
    }
}

export default EditProfile;