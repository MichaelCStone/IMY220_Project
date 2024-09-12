// u21497682 - Michael Stone
import React, { Component } from 'react';

class AddSongToPlaylist extends Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            selectedSong: ''
        };
    }

    handleSongChange = (event) => {
        this.setState({ selectedSong: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { selectedSong } = this.state;
        const { onAddSongToPlaylist } = this.props;

        if (selectedSong && onAddSongToPlaylist) {
            onAddSongToPlaylist(selectedSong);
            this.setState({ selectedSong: '' });
        }
    }

    render() 
    {
        const { songs } = this.props;
        const { selectedSong } = this.state;

        return (
            <div>
                <h2>Add a Song to Playlist</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Select Song:</label>
                        
                        <select value={selectedSong} onChange={this.handleSongChange} required>
                            <option value="">Select a song</option>
                            {songs.map((song, index) => (
                                <option key={index} value={song.title}>{song.title}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Add Song</button>
                </form>
            </div>
        );
    }

    // render() 
    // {
    //     return (
    //         <div className="add-song-to-playlist">
    //             <h3>Add Song to Playlist</h3>
    //             <form onSubmit={this.handleSubmit}>
    //                 <div>
    //                     <label>Song Title:</label>
    //                     <input type="text" name="songTitle" value={this.state.songTitle} onChange={this.handleChange} required />
    //                 </div>

    //                 <div>
    //                     <label>Artist:</label>
    //                     <input type="text" name="artist" value={this.state.artist} onChange={this.handleChange} required />
    //                 </div>

    //                 <div>
    //                     <label>Playlist:</label>
    //                     <input type="text" name="playlist" value={this.state.playlist} onChange={this.handleChange} required />
    //                 </div>

    //                 <button type="submit">Add Song</button>
    //             </form>
    //         </div>
    //     );
    // }
}

export default AddSongToPlaylist;