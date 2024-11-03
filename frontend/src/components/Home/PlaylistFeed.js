// u21497682 - Michael Stone
import React, { Component } from 'react';
import PlaylistPreview from '../General/PlaylistPreview'; // Adjust the path as needed
import SearchInput from './SearchInput';

class PlaylistFeed extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      searchTerm: ''  // State for the search term
    };
  }

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm });
  };

  render() 
  {
    const { playlists } = this.props; // Use props directly
    const { searchTerm } = this.state;

    const filteredPlaylists = playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        {/* Search Input */}
        <SearchInput handleSearch={this.handleSearch} />

        {/* Playlist Previews */}
        <div className="mt-6 space-y-4">
          {filteredPlaylists.map((playlist, index) => (
            <PlaylistPreview key={index} playlist={playlist} />
          ))}
        </div>
      </div>
    );
  }
}

export default PlaylistFeed;