// u21497682 - Michael Stone
import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from "../components/General/Navigation"
import Profile from '../components/Profile/Profile';
import EditProfile from '../components/Profile/EditProfile';
import PlaylistPreview from '../components/General/PlaylistPreview';
import ProfilePreview from '../components/General/ProfilePreview';
import CreatePlaylist from '../components/Profile/CreatePlaylist';

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
      <div>
        <h1>Profile Page!</h1>
        <Navigation />

        <div>
          <Profile profile={profile} toggleEdit={this.toggleEdit} isEditing={isEditing} />
        </div>

        <div>
          <button onClick={this.toggleEdit}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>

          {/* {isEditing && <EditProfile profile={profile} toggleEdit={this.toggleEdit} />} */}
          {isEditing && <EditProfile profile={profile} onSave={this.handleProfileUpdate} />}
        </div>

        <div className="playlists">
          <h3>User's Playlists</h3>
          {playlists.map((playlist, index) => (
            <PlaylistPreview key={index} playlist={playlist} />
          ))}

          <button onClick={this.toggleCreatePlaylist}>
            {isCreatingPlaylist ? 'Cancel' : 'Create New Playlist'}
          </button>

          {isCreatingPlaylist && <CreatePlaylist addPlaylist={this.handleAddPlaylist} />}
        </div>

        <div className="followers">
          <h3>Followers</h3>
          {followers.map((follower, index) => (
            <ProfilePreview key={index} profile={follower} />
          ))}
        </div>

        <div className="following">
          <h3>Following</h3>
          {following.map((followedUser, index) => (
            <ProfilePreview key={index} profile={followedUser} />
          ))}
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