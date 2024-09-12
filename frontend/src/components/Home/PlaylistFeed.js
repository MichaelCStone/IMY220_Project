// u21497682 - Michael Stone
import React, { Component } from 'react';
import PlaylistPreview from '../General/PlaylistPreview'; // Adjust the path as needed

class PlaylistFeed extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
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

  render() 
  {
    return (
      <div>
        <h2>Playlists</h2>
        {this.state.playlists.map((playlist, index) => (
          <PlaylistPreview key={index} playlist={playlist} />
        ))}
      </div>
    );
  }
}

export default PlaylistFeed;