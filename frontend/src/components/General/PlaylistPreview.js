// u21497682 - Michael Stone
import React, { Component } from 'react';

class PlaylistPreview extends Component 
{
  render() 
  {
    return (
      <div>
        {/* <img src={picture} alt={`${name} cover`} style={{ width: '100px', height: '100px' }} /> */}
        {/* <img></img> */}
        <h3>{this.props.playlist.name}</h3>
        <p>{this.props.playlist.genre}</p>
      </div>
    );
  }
}

export default PlaylistPreview;