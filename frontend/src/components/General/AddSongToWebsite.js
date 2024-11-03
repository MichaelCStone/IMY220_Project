// u21497682 - Michael Stone
import React, { Component } from 'react';

const thePort = 3000;

class AddSongToWebsite extends Component {
    constructor(props) {
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
        const { name, value } = event.target;
        console.log(`${name}: ${value}`);
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const newSong = {
            title: this.state.title || '',
            artist: this.state.artist || '',
            album: this.state.album || '',
            genre: this.state.genre || '',
            year: this.state.year || '',
            spotifyLink: this.state.spotifyLink || ''
        };

        console.log('Submitting new song:', newSong);

        try {
            const response = await fetch(`http://localhost:${thePort}/api/addSong`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSong)
            });

            if (response.ok) {
                const data = await response.json();

                if (this.props.onSave) {
                    this.props.onSave(data.newSong);
                }

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
            } else {
                const errorData = await response.json();
                this.setState({
                    errorMessage: errorData.message,
                    successMessage: ''
                });
            }
        } catch (error) {
            this.setState({
                errorMessage: 'Error adding song. Please try again later.',
                successMessage: ''
            });
        }
    };

    render() {
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a New Song</h2>
                {this.state.successMessage && <p className="text-green-500 mb-4">{this.state.successMessage}</p>}
                {this.state.errorMessage && <p className="text-red-500 mb-4">{this.state.errorMessage}</p>}

                <form onSubmit={this.handleSubmit} className="space-y-4">
                    {['Title', 'Artist', 'Album', 'Genre', 'Year', 'Spotify Link'].map((label) => (
                        <div key={label}>
                            <label className="block text-sm font-medium text-gray-700">{label}:</label>
                            <input
                                type={label === 'Year' ? 'number' : 'text'}
                                name={label.toLowerCase().replace(' ', '')}
                                value={this.state[label.toLowerCase().replace(' ', '')] || ''}
                                onChange={this.handleChange}
                                required
                                className="w-full mt-1 text-black p-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
                    >
                        Add Song
                    </button>
                </form>
            </div>
        );
    }
}

export default AddSongToWebsite;