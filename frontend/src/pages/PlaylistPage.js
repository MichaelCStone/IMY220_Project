// //u21497682 - Michael Stone
// import React, { Component } from 'react';
// import { useParams } from 'react-router-dom';
// import Navigation from "../components/General/Navigation";
// import Playlist from '../components/Playlist/Playlist';
// import SongList from '../components/Playlist/PlaylistSongs';
// import AddSongToPlaylist from '../components/General/AddSongToPlaylist';
// import CommentList from '../components/Playlist/CommentFeed';
// import AddComment from '../components/Playlist/AddComment';
// import EditPlaylist from '../components/Playlist/EditPlaylist';

// class PlaylistPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       playlist: null,
//       songs: [],
//       isAddingSong: false,
//       isEditing: false,
//     };
//   }

//   async componentDidMount() {
//     const { playlistId } = this.props.params;
//     const { playlists } = this.props;

//     if (playlists) {
//       const selectedPlaylist = playlists.find(
//         playlist => playlist.simpleId === parseInt(playlistId)
//       );

//       if (selectedPlaylist) {
//         this.setState({ playlist: selectedPlaylist });

//         // Fetch full details of each song by simpleId
//         const songs = await Promise.all(
//           selectedPlaylist.songs.map(simpleId => this.fetchSongDetails(simpleId))
//         );

//         this.setState({ songs });
//       } else {
//         console.error('Playlist not found');
//       }
//     } else {
//       console.error('Playlists data is undefined');
//     }
//   }

//   fetchSongDetails = async (simpleId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/songs/${simpleId}`);
//       const song = await response.json();
//       return song;
//     } catch (error) {
//       console.error('Error fetching song details:', error);
//       return null;
//     }
//   };

//   toggleAddSong = () => {
//     this.setState((prevState) => ({
//       isAddingSong: !prevState.isAddingSong,
//     }));
//   };

//   toggleEdit = () => {
//     this.setState((prevState) => ({
//       isEditing: !prevState.isEditing,
//     }));
//   };

//   render() {
//     const { playlist, songs, isAddingSong, isEditing } = this.state;

//     if (!playlist) {
//       return <div>Loading...</div>;
//     }

//     return (
//       <div>
//         <Navigation />
//         <h1>{playlist.name}</h1>
//         <Playlist playlist={playlist} />

//         <button onClick={this.toggleEdit}>
//           {isEditing ? 'Cancel Edit' : 'Edit Playlist'}
//         </button>
//         {isEditing && (
//           <EditPlaylist
//             playlist={playlist}
//             onUpdatePlaylist={(updatedPlaylist) =>
//               this.setState({ playlist: updatedPlaylist, isEditing: false })
//             }
//           />
//         )}

//         <div className="songs">
//           <SongList songs={songs} />
//           <button onClick={this.toggleAddSong}>
//             {isAddingSong ? 'Cancel' : 'Add Song'}
//           </button>
//           {isAddingSong && (
//             <AddSongToPlaylist
//               songs={songs}
//               playlistId={playlist.simpleId} // Assuming playlist.simpleId is the ID of the playlist
//               ownerId={playlist.ownerId} // Assuming playlist.ownerId is the ID of the owner
//               onAddSongToPlaylist={(song) =>
//                 this.setState({
//                   playlist: {
//                     ...playlist,
//                     songs: [...playlist.songs, song],
//                   },
//                 })
//               }
//             />
//           )}
//         </div>

//         <div className="comments">
//           <CommentList comments={playlist.comments || []} />
//           <AddComment
//             userName="John Doe"
//             onAddComment={(comment) =>
//               this.setState({
//                 playlist: {
//                   ...playlist,
//                   comments: [...(playlist.comments || []), comment],
//                 },
//               })
//             }
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default function PlaylistPageWrapper(props) {
//   const params = useParams();
//   return <PlaylistPage {...props} params={params} />;
// }




// u21497682 - Michael Stone
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
      songs: [],
      isAddingSong: false,
      isEditing: false,
      isOwner: false, // Track if the logged-in user is the owner
    };
  }

  async componentDidMount() {
    const { playlistId } = this.props.params;
    const { playlists } = this.props;

    // Fetch the logged-in user profile from localStorage
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const userSimpleId = userProfile ? userProfile.simpleId : null;

    if (playlists) {
      const selectedPlaylist = playlists.find(
        playlist => playlist.simpleId === parseInt(playlistId)
      );

      if (selectedPlaylist) {
        this.setState({ 
          playlist: selectedPlaylist,
          isOwner: selectedPlaylist.ownerId === userSimpleId, // Check if the user is the owner
        });

        // Fetch full details of each song by simpleId
        const songs = await Promise.all(
          selectedPlaylist.songs.map(simpleId => this.fetchSongDetails(simpleId))
        );

        this.setState({ songs });
      } else {
        console.error('Playlist not found');
      }
    } else {
      console.error('Playlists data is undefined');
    }
  }

  fetchSongDetails = async (simpleId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/songs/${simpleId}`);
      const song = await response.json();
      return song;
    } catch (error) {
      console.error('Error fetching song details:', error);
      return null;
    }
  };

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
    const { playlist, songs, isAddingSong, isEditing, isOwner } = this.state;

    if (!playlist) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Navigation />
        <h1>{playlist.name}</h1>
        <Playlist playlist={playlist} />

        {isOwner && (
          <>
            <button onClick={this.toggleEdit}>
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
          </>
        )}

        <div className="songs">
          <SongList songs={songs} />
          {isOwner && (
            <>
              <button onClick={this.toggleAddSong}>
                {isAddingSong ? 'Cancel' : 'Add Song'}
              </button>
              {isAddingSong && (
                <AddSongToPlaylist
                  songs={songs}
                  playlistId={playlist.simpleId} // Assuming playlist.simpleId is the ID of the playlist
                  ownerId={playlist.ownerId} // Assuming playlist.ownerId is the ID of the owner
                  onAddSongToPlaylist={(song) =>
                    this.setState({
                      playlist: {
                        ...playlist,
                        songs: [...playlist.songs, song],
                      },
                    })
                  }
                />
              )}
            </>
          )}
        </div>

        <div className="comments">
          <CommentList comments={playlist.comments || []} />
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
    );
  }
}

export default function PlaylistPageWrapper(props) {
  const params = useParams();
  return <PlaylistPage {...props} params={params} />;
}