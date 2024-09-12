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
      <div>
        <SearchInput handleSearch={this.handleSearch} />

        {filteredPlaylists.map((playlist, index) => (
          <PlaylistPreview key={index} playlist={playlist} />
        ))}
      </div>
    );
  }
}

export default PlaylistFeed;