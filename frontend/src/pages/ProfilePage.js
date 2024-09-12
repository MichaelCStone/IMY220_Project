// u21497682 - Michael Stone
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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

    // this.state = {
    //   isEditing: false,
    //   isCreatingPlaylist: false,
    // };

    this.state = {
      profile: props.profile, // use profile data from props
      playlists: props.playlists, // use playlists data from props
      followers: props.followers, // use followers data from props
      following: props.following, // use following data from props
      isEditing: false,
      isCreatingPlaylist: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreatePlaylist = this.toggleCreatePlaylist.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

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
    // const { profile, playlists, followers, following } = this.props;
    // const { isEditing, isCreatingPlaylist } = this.state;
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

export default ProfilePage;