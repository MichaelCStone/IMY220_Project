// u21497682 - Michael Stone
import React, { Component } from 'react';

class AddSongToPlaylist extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            
            songTitle: '',
            artist: '',
            playlist: ''
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // Placeholder for adding functionality (e.g., call a function to add song to playlist)
        console.log('Adding song to playlist:', this.state);
    };

    render() 
    {
        return (
            <div className="add-song-to-playlist">
                <h3>Add Song to Playlist</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Song Title:</label>
                        <input type="text" name="songTitle" value={this.state.songTitle} onChange={this.handleChange} required />
                    </div>

                    <div>
                        <label>Artist:</label>
                        <input type="text" name="artist" value={this.state.artist} onChange={this.handleChange} required />
                    </div>

                    <div>
                        <label>Playlist:</label>
                        <input type="text" name="playlist" value={this.state.playlist} onChange={this.handleChange} required />
                    </div>

                    <button type="submit">Add Song</button>
                </form>
            </div>
        );
    }
}

export default AddSongToPlaylist;