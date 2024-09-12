// u21497682 - Michael Stone
import React, { Component } from 'react';

class Profile extends Component {
    render() {
        const { profile } = this.props;

        return (
            <div className="profile">
                {/* <img src={profile.picture} alt="Profile" /> */}
                <h1>Name: {profile.name}</h1>
                <p>Bio: {profile.bio}</p>
                <p>Country: {profile.country}</p>
            </div>
        );
    }
}

export default Profile;