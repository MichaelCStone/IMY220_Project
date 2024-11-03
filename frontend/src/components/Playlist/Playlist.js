// Michael Stone - u21497682
import React, { Component } from 'react';

class Playlist extends Component {
  render() {
    const { playlist } = this.props;

    return (
      <div className="playlist-component">
        <h2>{playlist.name}</h2>
        <p>Author: {playlist.author}</p>
        <p>Genre: {playlist.genre}</p>
        <p>Category: {playlist.category}</p>
        <p>Hashtags: {Array.isArray(playlist.hashtags) ? playlist.hashtags.join(', ') : 'No hashtags available'}</p>
        <p>Description: {playlist.description || 'No description available'}</p>
      </div>
    );
  }
}

export default Playlist;