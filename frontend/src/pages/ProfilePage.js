// u21497682 - Michael Stone
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Navigation from "../components/General/Navigation"
import Profile from '../components/Profile/Profile';
import EditProfile from '../components/Profile/EditProfile';
import PlaylistPreview from '../components/General/PlaylistPreview';
import ProfilePreview from '../components/General/ProfilePreview';


class ProfilePage extends Component
{
  constructor(props) 
  {
    super(props);

    this.state = {
      isEditing: false,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() 
  {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing
    }));
  }

  render()
  {
    const { profile, playlists, followers, following } = this.props;
    const { isEditing } = this.state;

    return (
      <div>
        <h1>Profile Page!</h1>
        <Navigation />

        <div>
          <Profile profile={profile} toggleEdit={this.toggleEdit} isEditing={isEditing} />
        </div>

        <div>
          {isEditing && <EditProfile profile={profile} toggleEdit={this.toggleEdit} />}
        </div>

        <div className="playlists">
          <h3>User's Playlists</h3>
          {playlists.map((playlist, index) => (
            <PlaylistPreview key={index} playlist={playlist} />
          ))}
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