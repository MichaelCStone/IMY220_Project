// u21497682 - Michael Stone
import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from "../components/General/Navigation"
import Profile from '../components/Profile/Profile';
import EditProfile from '../components/Profile/EditProfile';
import PlaylistPreview from '../components/General/PlaylistPreview';
import ProfilePreview from '../components/General/ProfilePreview';
import CreatePlaylist from '../components/Profile/CreatePlaylist';
import AddSongToPlaylist from '../components/General/AddSongToPlaylist';

class ProfilePage extends Component
{
  constructor(props) 
  {
    super(props);

    this.state = {
      profile: {},
      playlists: [],
      followers: [],
      following: [],
      isEditing: false,
      isCreatingPlaylist: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreatePlaylist = this.toggleCreatePlaylist.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  componentDidMount() {
    // console.log(this.props);

    const { profile, username } = this.props;

    if (username) 
    {
      this.fetchProfile(username); // Fetch the profile based on username
    }
    else 
    {
      console.warn('Username is undefined. Cannot fetch profile and playlists.');
    }
  }

  fetchProfile = async (username) => {
    try 
    {
      const response = await fetch(`http://localhost:3000/api/profiles/${username}`);
      const profile = await response.json();
  
      if (profile) 
      {
        this.setState({ profile }, () => {
          this.fetchPlaylists(profile.simpleId); // Fetch playlists using the ownerId from profile
        });
      } 
      else 
      {
        console.warn('Fetched profile is undefined.');
      }
    } 
    catch (error) 
    {
      console.error('Error fetching profile:', error);
    }
  };

  fetchPlaylists = async (ownerId) => {
    try 
    {
      if (!ownerId) 
      {
        console.warn('ownerId is undefined.');
        return; // Prevent fetching if ownerId is not defined
      }
      
      const playlistsResponse = await fetch(`http://localhost:3000/api/playlists/user/${ownerId}`);

      const playlists = await playlistsResponse.json();

      this.setState({ playlists });
    } 
    catch (error) 
    {
      console.error('Error fetching playlists:', error);
    }
  };

  toggleEdit() 
  {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing
    }));
  }

  toggleCreatePlaylist() 
  {
    this.setState((prevState) => ({
      isCreatingPlaylist: !prevState.isCreatingPlaylist,
    }));
  }

  handleProfileUpdate(updatedProfile) 
  {
    this.setState({ profile: updatedProfile, isEditing: false });
  }

  // handleAddPlaylist = (newPlaylist) => {
  //   this.setState((prevState) => ({
  //     playlists: [...prevState.playlists, newPlaylist],
  //     isCreatingPlaylist: false,  // Hide the form after submission
  //   }));
  // }

  handleAddPlaylist = (newPlaylist) => {
    this.setState((prevState) => ({
      playlists: [...prevState.playlists, newPlaylist],
      isCreatingPlaylist: false,  // Hide the form after submission
    }));
  }

  render()
  {
    const { profile, playlists, followers, following, isEditing, isCreatingPlaylist } = this.state;

    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
        {/* Navigation */}
        <Navigation />

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Profile Page</h1>

          {/* Profile Section */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg mb-8">
            <Profile profile={profile} toggleEdit={this.toggleEdit} isEditing={isEditing} />
            <button
              onClick={this.toggleEdit}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
              <div className="mt-4">
                <EditProfile profile={profile} onSave={this.handleProfileUpdate} />
              </div>
            )}
          </div>

          {/* Playlists Section */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">User's Playlists</h2>
            {playlists.map((playlist, index) => (
              <div key={index} className="mb-4">
                <PlaylistPreview playlist={playlist} />
                <AddSongToPlaylist
                  songs={this.props.songs}
                  onAddSongToPlaylist={this.handleAddPlaylist}
                  playlistId={playlist.simpleId}
                  ownerId={profile.simpleId}
                />
              </div>
            ))}
            <button
              onClick={this.toggleCreatePlaylist}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
            >
              {isCreatingPlaylist ? 'Cancel' : 'Create New Playlist'}
            </button>
            {isCreatingPlaylist && (
              <div className="mt-4">
                <CreatePlaylist addPlaylist={this.handleAddPlaylist} profile={profile} />
              </div>
            )}
          </div>

          {/* Followers Section */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Followers</h2>
            {followers.map((follower, index) => (
              <ProfilePreview key={index} profile={follower} />
            ))}
          </div>

          {/* Following Section */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Following</h2>
            {following.map((followedUser, index) => (
              <ProfilePreview key={index} profile={followedUser} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

const ProfilePageWrapper = (props) => {
  const params = useParams();
  return <ProfilePage {...props} username={params.username} />;
};

export default ProfilePageWrapper;

// export default ProfilePage;