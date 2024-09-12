import React, { Component } from 'react';
import AddSongToWebsite from '../General/AddSongToWebsite';
import Song from '../General/Song';

class SongFeed extends Component 
{
    constructor(props) 
    {
        super(props);
        
        this.state = {
            // Dummy song data for testing
            songs: [
                { title: 'Imagine', artist: 'John Lennon', album: 'Imagine', genre: 'Rock', year: 1971 },
                { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', genre: 'Rock', year: 1975 },
                { title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', genre: 'Pop', year: 1982 }
            ]
        };

        showAddSongForm: false // State to manage form visibility
    }

    addSong = (newSong) => {
        this.setState((prevState) => ({
            songs: [...prevState.songs, newSong]
        }));
    };

    toggleAddSongForm = () => {
        this.setState((prevState) => ({
            showAddSongForm: !prevState.showAddSongForm
        }));
    };

    render() 
    {
        return (
            <div className="feed">
                <h2>Songs</h2>

                <button onClick={this.toggleAddSongForm}>
                    {this.state.showAddSongForm ? 'Hide Add Song Form' : 'Add a New Song'}
                </button>

                {this.state.showAddSongForm && <AddSongToWebsite onSave={this.addSong} />}

                {this.state.songs.map((song, index) => (
                    <Song key={index} song={song} />
                ))}
            </div>
        );
    }
}

export default SongFeed;