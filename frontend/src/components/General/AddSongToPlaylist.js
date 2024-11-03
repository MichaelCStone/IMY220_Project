// u21497682 - Michael Stone
import React, { Component } from 'react';

class AddSongToPlaylist extends Component 
{
    constructor(props) 
    {
        super(props);

        // this.state = {
        //     selectedSong: ''
        // };

        this.state = {
            songs: [], // Initialize an empty array for songs
            loading: true, // Set a loading state
            selectedSongs: []
        };
    }

    componentDidMount() {
        this.fetchSongs();
    }

    async fetchSongs() {
        try {
            const response = await fetch('http://localhost:3000/api/songs'); // Adjust the URL as needed
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Check for HTTP errors
            }
            const data = await response.json(); // Parse the response as JSON
            this.setState({ songs: data, loading: false }); // Update state with fetched songs
        } catch (error) {
            console.error("Error fetching songs:", error);
            this.setState({ loading: false }); // Update loading state on error
        }
    }

    handleSongChange = (event) => {
        this.setState({ selectedSong: event.target.value });
    }

    // handleSelectSong = (song) => {
    //     this.setState((prevState) => ({
    //         selectedSongs: [...prevState.selectedSongs, song]
    //     }));
    // };
    handleSelectSong = (song) => {
        this.setState((prevState) => {
            const alreadySelected = prevState.selectedSongs.some((s) => s.simpleId === song.simpleId);
            return {
                selectedSongs: alreadySelected
                    ? prevState.selectedSongs.filter((s) => s.simpleId !== song.simpleId) // Remove if already selected
                    : [...prevState.selectedSongs, song], // Add if not selected
            };
        });
    };

    // handleAddToPlaylist = () => {
    //     // Implement the logic to add selected songs to a playlist
    //     console.log("Adding to playlist:", this.state.selectedSongs);
    // };
    handleAddToPlaylist = async () => {
        const { selectedSongs } = this.state;
        const { onAddSongToPlaylist, playlistId, ownerId } = this.props;
    
        // Extract song IDs from the selectedSongs array
        const songIds = selectedSongs.map(song => song.simpleId);
    
        try {
            const response = await fetch(`http://localhost:3000/api/addSongsToPlaylist/${playlistId}/${ownerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ songIds }), // Send songIds array
            });
    
            const result = await response.json();
            if (response.ok) {
                console.log('Songs added to playlist:', result.message);
                this.setState({ selectedSongs: [] }); // Reset selected songs after adding
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error adding songs to playlist:', error);
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { selectedSong } = this.state;
        const { onAddSongToPlaylist, playlistId, ownerId } = this.props;

        if (selectedSong && onAddSongToPlaylist) {
            // Call the API to add the song to the playlist
            try {
                const response = await fetch(`http://localhost:3000/api/addSongToPlaylist/${playlistId}/${ownerId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ songId: selectedSong }),
                });

                const result = await response.json();
                if (response.ok) {
                    onAddSongToPlaylist(selectedSong); // Call the provided function to update the UI
                    this.setState({ selectedSong: '' });
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error('Error adding song to playlist:', error);
            }
        }
    }

    render() {
        const { songs, loading, selectedSongs } = this.state;

        if (loading) {
            return <div className="text-gray-500">Loading songs...</div>;
        }

        return (
            <div className="bg-white p-4 rounded-lg shadow-md max-w-xs mx-auto overflow-hidden h-80">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Songs to Playlist</h2>
                <div className="space-y-2 overflow-y-auto h-40">
                    {songs.map((song) => {
                        const isSelected = selectedSongs.some((s) => s.simpleId === song.simpleId);
                        return (
                            <div
                                key={song.simpleId}
                                className={`flex justify-between items-center p-2 border rounded-lg ${
                                    isSelected ? 'bg-green-100' : 'bg-gray-50 hover:bg-gray-100'
                                } transition duration-200`}
                            >
                                <span className="text-gray-700">{song.title}</span>
                                <button
                                    onClick={() => this.handleSelectSong(song)}
                                    className={`px-4 py-1 rounded-lg font-semibold ${
                                        isSelected
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : 'bg-indigo-500 text-white hover:bg-indigo-600'
                                    } transition duration-300`}
                                >
                                    {isSelected ? 'Unselect' : 'Select'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={this.handleAddToPlaylist}
                    disabled={selectedSongs.length === 0}
                    className={`w-full mt-4 py-1 font-semibold rounded-lg transition duration-300 ${
                        selectedSongs.length > 0
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Add Selected Songs to Playlist
                </button>

                {/* {selectedSongs.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected Songs:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {selectedSongs.map((song) => (
                                <li key={song.simpleId} className="text-gray-700">{song.title}</li>
                            ))}
                        </ul>
                    </div>
                )} */}
            </div>
        );
    }
}

export default AddSongToPlaylist;