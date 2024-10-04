// u21497682 - Michael Stone
import React, { Component } from 'react';

const thePort = 3000;

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
            year: '',
            spotifyLink: '',
            errorMessage: '',
            successMessage: ''
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const newSong = {
            title: this.state.title,
            artist: this.state.artist,
            album: this.state.album,
            genre: this.state.genre,
            year: this.state.year,
            spotifyLink: this.state.spotifyLink
        };

        try 
        {
            // Make the POST request to your API
            const response = await fetch(`http://localhost:${thePort}/api/addSong`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSong)
            });

            if (response.ok) 
            {
                const data = await response.json();
                
                // Optionally call the parent component's onSave method to update the UI
                if (this.props.onSave) 
                {
                    this.props.onSave(data.newSong);
                }

                // Reset the form and show a success message
                this.setState({
                    title: '',
                    artist: '',
                    album: '',
                    genre: '',
                    year: '',
                    spotifyLink: '',
                    successMessage: 'Song added successfully!',
                    errorMessage: ''
                });
            } 
            else 
            {
                const errorData = await response.json();
                this.setState({
                    errorMessage: errorData.message,
                    successMessage: ''
                });
            }
        } 
        catch (error) 
        {
            this.setState({
                errorMessage: 'Error adding song. Please try again later.',
                successMessage: ''
            });
        }

        // if (this.props.onSave) 
        // {
        //     this.props.onSave(newSong);
        // }

        // this.setState({
        //     title: '',
        //     artist: '',
        //     album: '',
        //     genre: '',
        //     year: '',
        //     spotifyLink: ''
        // });
    }

    render() {
        return (
            <div>
                <h2>Add a New Song</h2>

                {this.state.successMessage && <p style={{ color: 'green' }}>{this.state.successMessage}</p>}
                {this.state.errorMessage && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}

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

                    <div>
                        <label>spotifyLink:</label>
                        <input type="text" name="spotifyLink" value={this.state.spotifyLink} onChange={this.handleChange} required />
                    </div>

                    <button type="submit">Add Song</button>
                </form>
            </div>
        );
    }
}

export default AddSongToWebsite;