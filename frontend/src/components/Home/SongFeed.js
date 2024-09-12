import React, { Component } from 'react';
import AddSongToWebsite from '../General/AddSongToWebsite';
import Song from '../General/Song';

class SongFeed extends Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            showAddSongForm: false // State to manage form visibility
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

    render() {
        const { songs } = this.props;
        const { showAddSongForm } = this.state;

        return (
            <div className="feed">

                <button onClick={this.toggleAddSongForm}>
                    {showAddSongForm ? 'Hide Add Song Form' : 'Add a New Song'}
                </button>

                {showAddSongForm && <AddSongToWebsite onSave={this.addSong} />}

                {songs.map((song, index) => (
                    <Song key={index} song={song} />
                ))}
            </div>
        );
    }
}

export default SongFeed;