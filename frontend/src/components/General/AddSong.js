// u21497682 - Michael Stone
import React, { Component } from 'react';

class AddSong extends Component 
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
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.props.onSave)
        {
            this.props.onSave(this.state);
        }

        this.setState({
            title: '',
            artist: '',
            album: '',
            genre: '',
            year: ''
        });
    }

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

export default AddSong;