//Michael Stone - u21497682
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SplashPage from './pages/SplashPage';
import PlaylistPage from './pages/PlaylistPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const thePort = 3000;

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     songs: [
  //       { title: 'Song 1', artist: 'Artist 1', album: 'Album 1', genre: 'Pop', year: 2022 },
  //       { title: 'Song 2', artist: 'Artist 2', album: 'Album 2', genre: 'Rock', year: 2021 },
  //       { title: 'Song 3', artist: 'Artist 3', album: 'Album 3', genre: 'Jazz', year: 2020 },
  //       { title: 'Song 4', artist: 'Artist 4', album: 'Album 4', genre: 'Pop', year: 2024 },
  //       { title: 'Song 5', artist: 'Artist 5', album: 'Album 5', genre: 'Rock', year: 2023 },
  //       { title: 'Song 6', artist: 'Artist 6', album: 'Album 6', genre: 'Jazz', year: 2025 },
  //     ],

  //     playlists: [
  //       {
  //         id: '1',
  //         name: 'Chill Vibes',
  //         picture: 'https://example.com/chill_vibes.jpg',
  //         genre: 'Lo-Fi',
  //         author: 'Michael Stone',
  //         category: 'Relax',
  //         hashtags: ['#lofi', '#chill', '#study'],
  //         comments: [
  //           { author: 'Alice', content: 'Love this playlist! It helps me focus while studying.' },
  //           { author: 'Bob', content: 'Perfect for a relaxing evening. Thanks for sharing!' },
  //         ],
  //         description: 'Perfect playlist for relaxing and studying.',
  //         songs: [
  //           { title: 'Song 1', artist: 'Artist 1', album: 'Album 1', genre: 'Pop', year: 2022 },
  //           { title: 'Song 2', artist: 'Artist 2', album: 'Album 2', genre: 'Rock', year: 2021 },
            // { title: 'Song 3', artist: 'Artist 3', album: 'Album 3', genre: 'Jazz', year: 2020 },
  //         ]
  //       },
  //       {
  //         id: '2',
  //         name: 'Workout Hits',
  //         picture: 'https://example.com/workout_hits.jpg',
  //         genre: 'Pop',
  //         author: 'John Doe',
  //         category: 'Exercise',
  //         hashtags: ['#workout', '#hits', '#motivation'],
  //         comments: [
  //           { author: 'Charlie', content: 'Great beats for working out! Keeps me energized.' },
  //           { author: 'Diana', content: 'These tracks are awesome for a morning run!' },
  //         ],
  //         description: 'High-energy hits to keep you moving.',
  //         songs: [
  //           { title: 'Song 4', artist: 'Artist 4', album: 'Album 4', genre: 'Pop', year: 2024 },
  //           { title: 'Song 5', artist: 'Artist 5', album: 'Album 5', genre: 'Rock', year: 2023 },
  //           { title: 'Song 6', artist: 'Artist 6', album: 'Album 6', genre: 'Jazz', year: 2025 },
  //         ]
  //       }
  //     ],

  //     profile: {
  //       name: "Michael Stone",
  //       bio: "Music enthusiast and developer from South Africa",
  //       country: "South Africa",
  //       picture: "https://example.com/profile-picture.jpg",
  //     },

  //     followers: [
  //       { id: 1, name: "Alice" },
  //       { id: 2, name: "Bob" },
  //     ],

  //     following: [
  //       { id: 3, name: "Charlie" },
  //       { id: 4, name: "Diana" },
  //     ]
  //   };
  // }

  constructor(props) {
    super(props);
    this.state = {
      userProfile: null, // Initialize with null or an empty object
      songs: [],
      playlists: [],
      profile: {},
      followers: [],
      following: []
    };
  }

  componentDidMount() {
    this.fetchSongs();
    this.fetchPlaylists();
  }

  fetchSongs = async () => {
    try 
    {
      const response = await fetch(`http://localhost:${thePort}/api/songs`);
      const songs = await response.json();
      this.setState({ songs });
    } 
    catch (error) 
    {
      console.error('Error fetching songs:', error);
    }
  };

  fetchPlaylists = async () => {
    try 
    {
      const response = await fetch(`http://localhost:${thePort}/api/playlists`);
      const playlists = await response.json();
      this.setState({ playlists });
    } 
    catch (error) 
    {
      console.error('Error fetching playlists:', error);
    }
  };

  handleLogin = (profile) => {
    this.setState({ userProfile: profile });
    // Redirect or perform any additional actions after login
  };

  addSong = (newSong) => {
    this.setState((prevState) => ({
      songs: [...prevState.songs, newSong]
    }));
  };

  render() {

    const { songs, playlists, profile, followers, following, userProfile } = this.state;

    return (
      <Router>
        <Routes>
          <Route path="/" element={<SplashPage />} />

          {/* <Route path="/login" element={<LoginPage/>} /> */}
          <Route path="/login" element={<LoginPage onLogin={this.handleLogin} />} />

          <Route path="/signup" element={<SignUpPage/>} />

          <Route path="/home" element={<HomePage songs={songs} playlists={playlists} onAddSong={this.addSong} />} />
          
          <Route path="/playlist" element={<PlaylistPage playlist={playlists} songs={songs} />} />
          {/* <Route path="/playlist/:id" element={<PlaylistPage playlist={playlists[0]} songs={songs} />} /> */}
          {/* <Route path="/playlist/:id" element={<PlaylistPage playlists={playlists} songs={songs} />} /> */}

          <Route path="/profile" element={<ProfilePage profile={profile} playlists={playlists} followers={followers} following={following} />} />
          {/* <Route path="/profile/:id" element={<ProfilePage profile={profile} playlists={playlists} followers={followers} following={following} />} /> */}
        </Routes>
      </Router>
    );
  }
}

export default App;