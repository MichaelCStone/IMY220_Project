// Michael Stone - u21497682
import React, { Component } from 'react';
// import SongComponent from '../components/SongComponent';  // Assuming you already have a SongComponent
import Song from '../General/Song';

class SongList extends Component 
{
  render() 
  {
    const { songs } = this.props;

    return (
      <div className="song-list">
        <h3>Songs in Playlist</h3>
        {songs.map((song, index) => (
          <SongComponent key={index} song={song} />
        ))}
      </div>
    );
  }
}

export default SongList;