// Michael Stone - u21497682
import React, { Component } from 'react';
// import SongComponent from '../components/SongComponent';  // Assuming you already have a SongComponent
import Song from '../General/Song';

class SongList extends Component 
{
  render() {
    const { songs = [] } = this.props; // Set a default empty array if songs is undefined

    return (
      <div className="song-list">
        <h3>Songs in Playlist</h3>
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <Song key={index} song={song} />
          ))
        ) : (
          <p>No songs in this playlist.</p>
        )}
      </div>
    );
  }
}

export default SongList;