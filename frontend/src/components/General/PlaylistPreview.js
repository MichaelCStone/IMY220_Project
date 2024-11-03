// u21497682 - Michael Stone
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlaylistPreview extends Component 
{
  render() {
    const { name, genre, picture, simpleId } = this.props.playlist;

    // return (
    //   <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow space-x-4">
    //     {/* Placeholder for Album Cover Image */}
    //     <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
    //       <img src={picture} alt={`${name} cover`} className="w-full h-full object-cover rounded-lg" />
    //     </div>

    //     {/* Playlist Information */}
    //     <div>
    //       <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
    //       <p className="text-gray-600">{genre}</p>
    //     </div>
    //   </div>
    // );
    return (
      <Link to={`/playlist/${simpleId}`} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow space-x-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
          <img src={picture} alt={`${name} cover`} className="w-full h-full object-cover rounded-lg" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600">{genre}</p>
        </div>
      </Link>
    );
  }
}

export default PlaylistPreview;