// Michael Stone - u21497682
import React, { Component } from 'react';

class Playlist extends Component {
  render() 
  {
    const { playlist } = this.props; //add image

    return (
      <div className="playlist-component">
        {/* <img src={picture} alt={`${name} cover`} style={{ width: '150px', height: '150px' }} /> */}
        <h2>{playlist.name}</h2>
        <p>Author: {playlist.author}</p>
        <p>Genre: {playlist.genre}</p>
        <p>Category: {playlist.category}</p>
        <p>Hashtags: {playlist.hashtags.join(', ')}</p>
        <p>Description: {playlist.description}</p>
      </div>
    );
  }
}

export default Playlist;