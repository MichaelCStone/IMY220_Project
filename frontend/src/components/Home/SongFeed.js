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
            <div className="feed">

                <button onClick={this.toggleAddSongForm}>
                    {showAddSongForm ? 'Hide Add Song Form' : 'Add a New Song'}
                </button>

                {showAddSongForm && <AddSongToWebsite onSave={this.addSong} />}

                <SearchInput handleSearch={this.handleSearch} />

                {filteredSongs.map((song, index) => (
                    <Song key={index} song={song} />
                ))}
            </div>
        );
    }
}

export default SongFeed;