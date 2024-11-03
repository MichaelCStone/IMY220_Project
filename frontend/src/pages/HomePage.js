// u21497682 - Michael Stone
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Navigation from "../components/General/Navigation"
import SongFeed from '../components/Home/SongFeed';
import PlaylistFeed from '../components/Home/PlaylistFeed';

class HomePage extends Component {
  render() {
    const { songs, playlists, onAddSong } = this.props;

    //   return (
    //     <div>
    //       <h1>Hello Home Page</h1>

    //       <Navigation />

    //       <h2>Songs</h2>
    //       <SongFeed songs={songs} onAddSong={onAddSong} />

    //       <h2>Playlists</h2>
    //       <PlaylistFeed playlists={playlists} />
    //     </div>
    //   );

    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <div className="container mx-auto px-4 py-10">
          {/* Navigation Bar */}
          <Navigation />

          {/* Welcome Header */}
          <header className="my-8 text-center">
            {/* <h1 className="text-5xl font-extrabold tracking-tight">Hello Home Page</h1> */}
            <p className="text-lg font-light mt-2">Discover the latest songs and playlists!</p>
          </header>

          {/* Songs Section */}
          <section className="my-12">
            <h2 className="text-3xl font-semibold border-b-2 border-white pb-2">Songs</h2>
            <div className="mt-6">
              <SongFeed songs={songs} onAddSong={onAddSong} />
            </div>
          </section>

          {/* Playlists Section */}
          <section className="my-12">
            <h2 className="text-3xl font-semibold border-b-2 border-white pb-2">Playlists</h2>
            <div className="mt-6">
              <PlaylistFeed playlists={playlists} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default HomePage;