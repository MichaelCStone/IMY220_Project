// Michael Stone - u21497682
import React, { Component } from 'react';

class Playlist extends Component {
  render() {
    const { playlist } = this.props;

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{playlist.name}</h2>
        
        <p className="text-gray-600 mb-2">
          <span className="font-semibold text-gray-700">Author:</span> {playlist.author || 'Unknown'}
        </p>
        
        <p className="text-gray-600 mb-2">
          <span className="font-semibold text-gray-700">Genre:</span> {playlist.genre || 'Not specified'}
        </p>
        
        <p className="text-gray-600 mb-2">
          <span className="font-semibold text-gray-700">Category:</span> {playlist.category || 'Not specified'}
        </p>
        
        <p className="text-gray-600 mb-2">
          <span className="font-semibold text-gray-700">Hashtags:</span> {Array.isArray(playlist.hashtags) && playlist.hashtags.length > 0 ? playlist.hashtags.join(', ') : 'No hashtags available'}
        </p>
        
        <p className="text-gray-600">
          <span className="font-semibold text-gray-700">Description:</span> {playlist.description || 'No description available'}
        </p>
      </div>
    );
  }
}

export default Playlist;