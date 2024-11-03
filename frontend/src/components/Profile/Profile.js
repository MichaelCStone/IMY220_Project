// u21497682 - Michael Stone
import React, { Component } from 'react';

class Profile extends Component {
    render() 
    {
        const { profile } = this.props;

        return (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-gray-800">
                {/* Profile Picture Placeholder */}
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {/* Uncomment and replace with the actual image source when available */}
                    <img src={profile.picture} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    {/* <span className="text-gray-500 text-sm">No Image</span> */}
                </div>

                {/* Profile Details */}
                <h1 className="text-2xl font-bold text-center mb-2">Name: {profile.name}</h1>
                <p className="text-center text-gray-600 mb-2">Bio: {profile.bio}</p>
                <p className="text-center text-gray-600">Country: {profile.country}</p>
            </div>
        );
    }
}

export default Profile;