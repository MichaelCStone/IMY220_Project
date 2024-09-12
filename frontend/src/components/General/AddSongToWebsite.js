// u21497682 - Michael Stone
import React, { Component } from 'react';

class AddSongToWebsite extends Component 
{
    constructor (props)
    {
        super(props);

        this.state = {
            title: '',
            artist: '',
            album: '',
            genre: '',
            year: ''
            // songs: []
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // if (this.props.onSave)
        // {
        //     this.props.onSave(this.state);
        // }

        const newSong = {
            title: this.state.title,
            artist: this.state.artist,
            album: this.state.album,
            genre: this.state.genre,
            year: this.state.year
        };

        // this.onSave();

        if (this.props.onSave) 
        {
            this.props.onSave(newSong);
        }

        this.setState({
            title: '',
            artist: '',
            album: '',
            genre: '',
            year: ''
        });
    }

    onSave = () => {
        const newSong = {
          title: this.state.title,
          artist: this.state.artist,
          album: this.state.album,
          genre: this.state.genre,
          year: this.state.year
        };
    
        // You can log or handle the song in any way you want
        console.log('Song added:', newSong);
    
        // Here we could add the new song to a local state, database, etc.
        // this.setState((prevState) => ({
        //   songs: [...prevState.songs, newSong]
        // }));
        if (this.props.onAddSong) 
        {
            this.props.onAddSong(newSong);
        }
      };

    render() {
        return (
            <div>
                <h2>Add a New Song</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required />
                    </div>

                    <div>
                        <label>Artist:</label>
                        <input type="text" name="artist" value={this.state.artist} onChange={this.handleChange} required />
                    </div>

                    <div>
                        <label>Album:</label>
                        <input type="text" name="album" value={this.state.album} onChange={this.handleChange} required />
                    </div>

                    <div>
                        <label>Genre:</label>
                        <input type="text" name="genre" value={this.state.genre} onChange={this.handleChange} required />
                    </div>

                    <div>
                        <label>Year:</label>
                        <input type="number" name="year" value={this.state.year} onChange={this.handleChange} required />
                    </div>

                    <button type="submit">Add Song</button>
                </form>
            </div>
        );
    }
}

export default AddSongToWebsite;