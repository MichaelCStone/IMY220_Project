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

    handleSelectSong = (song) => {
        this.setState((prevState) => ({
            selectedSongs: [...prevState.selectedSongs, song]
        }));
    };

    handleAddToPlaylist = () => {
        // Implement the logic to add selected songs to a playlist
        console.log("Adding to playlist:", this.state.selectedSongs);
    };

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     const { selectedSong } = this.state;
    //     const { onAddSongToPlaylist } = this.props;

    //     if (selectedSong && onAddSongToPlaylist) 
    //     {
    //         onAddSongToPlaylist(selectedSong);
    //         this.setState({ selectedSong: '' });
    //     }
    // }

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

    // render() 
    // {
    //     // const { songs } = this.props;
    //     // const { selectedSong } = this.state;
    //     const { songs, loading } = this.state;

    //     if (loading) {
    //         return <div>Loading songs...</div>; // Handle loading state
    //     }

    //     return (
    //         <div>
    //             {songs.map(song => (
    //                 <div key={song.id}>{song.title}</div> // Render the song titles
    //             ))}
    //         </div>
    //     );

    //     // return (
    //     //     <div>
    //     //         <h2>Add a Song to Playlist</h2>
    //     //         <form onSubmit={this.handleSubmit}>
    //     //             <div>
    //     //                 <label>Select Song:</label>
                        
    //     //                 <select value={selectedSong} onChange={this.handleSongChange} required>
    //     //                     <option value="">Select a song</option>
    //     //                     {songs.map((song, index) => (
    //     //                         // <option key={index} value={song.title}>
    //     //                         <option key={index} value={song.id}>
    //     //                             {song.title} - {song.artist}
    //     //                         </option>
    //     //                     ))}
    //     //                 </select>
    //     //             </div>
    //     //             <button type="submit">Add Song</button>
    //     //         </form>
    //     //     </div>
    //     // );
    // }

    render() {
        const { songs, loading, selectedSongs } = this.state;

        if (loading) {
            return <div>Loading songs...</div>;
        }

        return (
            <div>
                <h2>Select Songs to Add to Playlist</h2>
                {songs.map(song => (
                    <div key={song.id} style={{ marginBottom: '10px' }}>
                        <span>{song.title}</span>
                        <button onClick={() => this.handleSelectSong(song)}>
                            Select
                        </button>
                    </div>
                ))}
                <button onClick={this.handleAddToPlaylist} disabled={selectedSongs.length === 0}>
                    Add Selected Songs to Playlist
                </button>
                {selectedSongs.length > 0 && (
                    <div>
                        <h3>Selected Songs:</h3>
                        <ul>
                            {selectedSongs.map(song => (
                                <li key={song.id}>{song.title}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default AddSongToPlaylist;