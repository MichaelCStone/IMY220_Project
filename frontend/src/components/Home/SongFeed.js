import React, { Component } from 'react';
import AddSongToWebsite from '../General/AddSongToWebsite';
import Song from '../General/Song';
import SearchInput from './SearchInput';

class SongFeed extends Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            showAddSongForm: false, // State to manage form visibility
            searchTerm: '',  // State for the search term
        };
    }

    addSong = (newSong) => {
        if (this.props.onAddSong) 
        {
            this.props.onAddSong(newSong);
        }
    };

    toggleAddSongForm = () => {
        this.setState((prevState) => ({
            showAddSongForm: !prevState.showAddSongForm
        }));
    };

    handleSearch = (searchTerm) => {
        this.setState({ searchTerm });
    };

    render() {
        const { songs } = this.props;
        const { showAddSongForm, searchTerm } = this.state;

        // Filter songs based on the search term
        const filteredSongs = songs.filter(song =>
            song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
              {/* Add Song Button */}
              <button
                onClick={this.toggleAddSongForm}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-4"
              >
                {showAddSongForm ? 'Hide Add Song Form' : 'Add a New Song'}
              </button>
      
              {/* Add Song Form */}
              {showAddSongForm && (
                <div className="mb-6">
                  <AddSongToWebsite onSave={this.addSong} />
                </div>
              )}
      
              {/* Search Input */}
              <div className="mb-6">
                <SearchInput handleSearch={this.handleSearch} />
              </div>
      
              {/* Song List */}
              <div className="space-y-4">
                {filteredSongs.map((song, index) => (
                  <Song key={index} song={song} />
                ))}
              </div>
            </div>
          );
    }
}

export default SongFeed;