// u21497682 - Michael Stone
import React, { Component } from 'react';

class Song extends Component 
{
    render() 
    {
        return (
            <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-gray-800">{this.props.song.title || "Untitled Song"}</h4>
              <p className="text-gray-600">{this.props.song.artist || "Unknown Artist"}</p>
            </div>
          );
    }
}

export default Song;