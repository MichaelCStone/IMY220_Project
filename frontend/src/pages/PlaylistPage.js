//u21497682 - Michael Stone
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from "../components/General/Navigation";
import Playlist from '../components/Playlist/Playlist';
import SongList from '../components/Playlist/PlaylistSongs';
import AddSongToPlaylist from '../components/General/AddSongToPlaylist';
import CommentList from '../components/Playlist/CommentFeed';
import AddComment from '../components/Playlist/AddComment';
import EditPlaylist from '../components/Playlist/EditPlaylist';

class PlaylistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: null,
      isAddingSong: false,
      isEditing: false,
    };
  }

  componentDidMount() {
    const { playlistId } = this.props.params;
    const { playlists } = this.props;

    if (playlists) {
      const selectedPlaylist = playlists.find(
        playlist => playlist.simpleId === parseInt(playlistId)
      );
      if (selectedPlaylist) {
        this.setState({ playlist: selectedPlaylist });
      } else {
        console.error('Playlist not found');
      }
    } else {
      console.error('Playlists data is undefined');
    }
  }

  toggleAddSong = () => {
    this.setState((prevState) => ({
      isAddingSong: !prevState.isAddingSong,
    }));
  };

  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  };

  render() {
    const { playlist, isAddingSong, isEditing } = this.state;
    const { songs } = this.props;

    if (!playlist) {
      return <div>Loading...</div>;
    }

    const songsInPlaylist = playlist.songs || []; // Ensure songs is an array

    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="max-w-4xl mx-auto p-6">
          {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">{playlist.name}</h1> */}
          <Playlist playlist={playlist} />

          <div className="flex items-center space-x-4 my-6">
            <button
              onClick={this.toggleEdit}
              className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Playlist'}
            </button>
            {isEditing && (
              <EditPlaylist
                playlist={playlist}
                onUpdatePlaylist={(updatedPlaylist) =>
                  this.setState({ playlist: updatedPlaylist, isEditing: false })
                }
              />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Songs in Playlist</h3>
            <SongList songs={songsInPlaylist} />
            <div className="mt-4">
              <button
                onClick={this.toggleAddSong}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                {isAddingSong ? 'Cancel' : 'Add Song'}
              </button>
            </div>
            {isAddingSong && (
              <div className="mt-4">
                <AddSongToPlaylist
                  songs={songs}
                  onAddSongToPlaylist={(song) =>
                    this.setState({
                      playlist: {
                        ...playlist,
                        songs: [...songsInPlaylist, song],
                      },
                    })
                  }
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Comments</h3>
            <CommentList comments={playlist.comments || []} />
            <div className="mt-4">
              <AddComment
                userName="John Doe"
                onAddComment={(comment) =>
                  this.setState({
                    playlist: {
                      ...playlist,
                      comments: [...(playlist.comments || []), comment],
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function PlaylistPageWrapper(props) {
  const params = useParams();
  return <PlaylistPage {...props} params={params} />;
}