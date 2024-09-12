//Michael Stone - u21497682
import React, { Component } from 'react';
import PlaylistPreview from '../General/PlaylistPreview';

class ProfilePlaylistFeed extends Component {
    render() {
        const { playlists } = this.props; //took out songs

        return (
            <div className="profile-feed">
                <h2>Playlists</h2>
                <ul>
                    {playlists.map((playlist, index) => (
                        <li key={index}>
                            <PlaylistPreview playlist={playlist} />
                        </li>
                    ))}
                </ul>

                {/* <h2>Songs</h2>
                <ul>
                    {songs.map((song, index) => (
                        <li key={index}>
                            <h3>{song.title}</h3>
                            <p>{song.artist} - {song.album}</p>
                        </li>
                    ))}
                </ul> */}
            </div>
        );
    }
}

export default ProfilePlaylistFeed;