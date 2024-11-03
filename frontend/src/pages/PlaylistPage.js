// // u21497682 - Michael Stone
// import React, { Component } from 'react';
// // import { Link } from 'react-router-dom';
// import Navigation from "../components/General/Navigation"
// import Playlist from '../components/Playlist/Playlist';
// import SongList from '../components/Playlist/PlaylistSongs';
// import AddSongToPlaylist from '../components/General/AddSongToPlaylist';
// import CommentList from '../components/Playlist/CommentFeed';
// import AddComment from '../components/Playlist/AddComment';
// import EditPlaylist from '../components/Playlist/EditPlaylist';

// class PlaylistPage extends Component 
// {
//   constructor(props) 
//   {
//     super(props);

//     this.state = {
//       playlist: props.playlist,
//       songs: props.songs,
//       isAddingSong: false,
//       isEditing: false,
//       newComment: ''
//     };

//     this.toggleAddSong = this.toggleAddSong.bind(this);
//     this.handleAddSong = this.handleAddSong.bind(this);
//     this.handleAddComment = this.handleAddComment.bind(this);
//     this.toggleEdit = this.toggleEdit.bind(this);
//     this.handleUpdatePlaylist = this.handleUpdatePlaylist.bind(this);
//   }

//   toggleAddSong() 
//   {
//     this.setState((prevState) => ({
//       isAddingSong: !prevState.isAddingSong
//     }));
//   }

//   handleAddSong(newSongTitle) 
//   {
//     // Assuming `songs` state holds the list of all songs
//     const selectedSong = this.state.songs.find(song => song.title === newSongTitle);

//     if (selectedSong) {
//       this.setState((prevState) => ({
//         playlist: {
//           ...prevState.playlist,
//           songs: [...prevState.playlist.songs, selectedSong]
//         },
//         isAddingSong: false
//       }));
//     }
//   }

//   handleAddComment(newComment) 
//   {
//     this.setState((prevState) => ({
//       playlist: { ...prevState.playlist, comments: [...prevState.playlist.comments, newComment] }
//     }));
//   }

//   toggleEdit() 
//   {
//     this.setState((prevState) => ({
//       isEditing: !prevState.isEditing
//     }));
//   }

//   handleUpdatePlaylist(updatedPlaylist) 
//   {
//     this.setState({ playlist: updatedPlaylist, isEditing: false });
//   }

//   render() 
//   {
//     const { playlist, songs, isAddingSong, isEditing } = this.state;

//     // const { playlists, songs, isAddingSong, isEditing } = this.state;
//     // const { id } = useParams();
//     // const playlist = playlists.find(playlist => playlist.id === id);

//     return (
//       <div>
//         <h1>Playlist Page!</h1>
//         <Navigation />

//         <div>
//           <Playlist playlist={playlist} />

//           <button onClick={this.toggleEdit}>
//             {isEditing ? 'Cancel Edit' : 'Edit Playlist'}
//           </button>

//           {isEditing && (<EditPlaylist playlist={playlist} onUpdatePlaylist={this.handleUpdatePlaylist} /> )}
//         </div>
        

//         <div className="songs">
//           {/* <h3>Playlist Songs</h3> */}
//           <SongList songs={playlist.songs} />

//           <button onClick={this.toggleAddSong}>
//             {isAddingSong ? 'Cancel' : 'Add Song'}
//           </button>

//           {/* {isAddingSong && <AddSongToPlaylist addSong={this.handleAddSong} />} */}
//           {isAddingSong && <AddSongToPlaylist songs={songs} onAddSongToPlaylist={this.handleAddSong} />}
//         </div>

//         <div className="comments">
//           <CommentList comments={playlist.comments} />

//           <AddComment  userName="John Doe" onAddComment={this.handleAddComment} /> {/* userPicture="sdasd.jpg" */}
//         </div>
//       </div>
//     );
//   }
// }

// export default PlaylistPage;

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
      <div>
        <Navigation />
        <h1>{playlist.name}</h1>
        <Playlist playlist={playlist} />

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

        <div className="songs">
          <SongList songs={songsInPlaylist} /> {/* Ensure songsInPlaylist is passed */}
          <button onClick={this.toggleAddSong}>
            {isAddingSong ? 'Cancel' : 'Add Song'}
          </button>
          {isAddingSong && (
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