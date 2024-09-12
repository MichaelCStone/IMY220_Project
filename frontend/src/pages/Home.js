// u21497682 - Michael Stone
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Navigation from "../components/General/Navigation"
import SongFeed from '../components/Home/SongFeed';
import PlaylistFeed from '../components/Home/PlaylistFeed';

class Home extends Component 
{
  render() 
  {
    const { songs, playlists, onAddSong } = this.props;

    return (
      <div>
        <h1>Hello Home Page</h1>

        <Navigation />
        
        <h2>Songs</h2>
        <SongFeed songs={songs} onAddSong={onAddSong} />

        <h2>Playlists</h2>
        <PlaylistFeed playlists={playlists} />
      </div>
    );
  }
}

export default Home;