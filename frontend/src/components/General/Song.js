// u21497682 - Michael Stone
import React, { Component } from 'react';

class Song extends Component 
{
    render() 
    {
        // return (
        //     <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        //       <h4 className="text-xl font-semibold text-gray-800">{this.props.song.title}</h4>
        //       <p className="text-gray-600">{this.props.song.artist}</p>
        //     </div>
        //   );
        return (
          <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
            <p className="text-gray-800 font-semibold">{song.title || "No Title"}</p>
            <p className="text-gray-600 text-sm">{song.artist || "No Artist"}</p>
          </div>
        );
    }
}

export default Song;