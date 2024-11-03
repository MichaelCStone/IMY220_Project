// u21497682 - Michael Stone
import React, { Component } from 'react';

class Song extends Component 
{
  render() 
  {
      const { song } = this.props;
      const spotifyLink = song.spotifyLink || '#'; // Use '#' as fallback if no link is available

      return (
          <a 
              href={spotifyLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
              <h4 className="text-xl font-semibold text-gray-800">
                  {song.title || "Untitled Song"}
              </h4>
              <p className="text-gray-600">
                  {song.artist || "Unknown Artist"}
              </p>
          </a>
      );
  }
}

export default Song;