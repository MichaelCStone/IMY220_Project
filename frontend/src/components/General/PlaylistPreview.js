//Michael Stone - u21497682
import React, { Component } from 'react';
import AddSongToPlaylist from './AddSongToPlaylist'; // Adjust the import path if needed

class PlaylistPreview extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      showAddSongForm: false
    };
  }

  toggleAddSongForm = () => {
    this.setState(prevState => ({
      showAddSongForm: !prevState.showAddSongForm
    }));
  };

  handleSaveSong = (song) => {
    // Logic to add the song to the playlist
    console.log('Song added to playlist:', song);
    // Close the form after saving the song
    this.toggleAddSongForm();
  };

  render() 
  {
    const { name, author, genre, description, songs } = this.props;
    const { showAddSongForm } = this.state;

    const songPreview = songs.length > 0 ? `${songs[0].title} by ${songs[0].artist}` : 'No songs';

    return (
      <div className="playlist-preview">
        <h4>{name}</h4>
        <p>Author: {author}</p>
        <p>Genre: {genre}</p>
        <p>Description: {description.substring(0, 50)}{description.length > 50 ? '...' : ''}</p>
        <p>First Song: {songPreview}</p>

        <button onClick={this.toggleAddSongForm}>
          {showAddSongForm ? 'Cancel' : 'Add Song'}
        </button>

        {showAddSongForm && (
          <AddSongToPlaylist onSave={this.handleSaveSong} />
        )}
      </div>
    );
  }
}

export default PlaylistPreview;