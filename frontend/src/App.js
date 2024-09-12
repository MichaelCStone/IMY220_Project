//Michael Stone - u21497682
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SplashPage from './pages/SplashPage';
import PlaylistPage from './pages/PlaylistPage';
import ProfilePage from './pages/ProfilePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [
        { title: 'Song 1', artist: 'Artist 1', album: 'Album 1', genre: 'Pop', year: 2022 },
        { title: 'Song 2', artist: 'Artist 2', album: 'Album 2', genre: 'Rock', year: 2021 },
        { title: 'Song 3', artist: 'Artist 3', album: 'Album 3', genre: 'Jazz', year: 2020 },
      ],
      playlists: [
        {
          name: 'Chill Vibes',
          picture: 'https://example.com/chill_vibes.jpg',
          genre: 'Lo-Fi',
          author: 'Michael Stone',
          category: 'Relax',
          hashtags: ['#lofi', '#chill', '#study'],
          comments: [],
          description: 'Perfect playlist for relaxing and studying.',
          songs: ['Song 1', 'Song 2', 'Song 3']
        },
        {
          name: 'Workout Hits',
          picture: 'https://example.com/workout_hits.jpg',
          genre: 'Pop',
          author: 'John Doe',
          category: 'Exercise',
          hashtags: ['#workout', '#hits', '#motivation'],
          comments: [],
          description: 'High-energy hits to keep you moving.',
          songs: ['Song 4', 'Song 5', 'Song 6']
        }
      ]
    };
  }

  addSong = (newSong) => {
    this.setState((prevState) => ({
      songs: [...prevState.songs, newSong]
    }));
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/home" element={<HomePage songs={this.state.songs} playlists={this.state.playlists} onAddSong={this.addSong} />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;