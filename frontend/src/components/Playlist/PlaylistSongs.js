// Michael Stone - u21497682
import React, { Component } from 'react';
// import SongComponent from '../components/SongComponent';  // Assuming you already have a SongComponent
import Song from '../General/Song';

class SongList extends Component 
{
  render() {
    const { songs = [] } = this.props; // Set a default empty array if songs is undefined

    console.log(songs);

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Songs in Playlist</h3>
        
        {songs.length > 0 ? (
          <div className="space-y-4">
            {songs.map((song, index) => (
              <Song key={index} song={song} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No songs in this playlist.</p>
        )}
      </div>
    );
  }
}

export default SongList;