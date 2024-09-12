// u21497682 - Michael Stone
import React, { Component } from 'react';

class Profile extends Component 
{
  render() 
  {
    return (
      <div>
        {/* Implement some kind of image */}
        <h3>{this.props.profile.name}</h3>
      </div>
    );
  }
}

export default ProfilePreview;