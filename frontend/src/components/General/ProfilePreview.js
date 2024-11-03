// u21497682 - Michael Stone
import React, { Component } from 'react';

class ProfilePreview extends Component 
{
  render() 
  {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 text-gray-800">
        {/* Profile Image Placeholder */}
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          {/* If profile picture is available, display it here */}
          {/* <img src={profile.picture} alt={profile.name} className="w-full h-full object-cover rounded-full" /> */}
          <span className="text-gray-500 text-sm">No Image</span>
        </div>

        {/* Profile Name */}
        <div>
          <h3 className="text-lg font-semibold">{profile.name}</h3>
        </div>
      </div>
    );
  }
}

export default ProfilePreview;