//Michael Stone - u21497682
import React, { Component } from 'react';
import ProfilePreview from './ProfilePreview';

class FollowersFollowing extends Component 
{
    render() 
    {
        const { followers, following } = this.props;

        return (
            <div className="followers-following">
                <h2>Followers</h2>
                <ul>
                    {followers.map((user, index) => (
                        <li key={index}>
                            <ProfilePreview profile={user} />
                        </li>
                    ))}
                </ul>

                <h2>Following</h2>
                <ul>
                    {following.map((user, index) => (
                        <li key={index}>
                            <ProfilePreview profile={user} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default FollowersFollowing;