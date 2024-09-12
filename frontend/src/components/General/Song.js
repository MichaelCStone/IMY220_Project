// u21497682 - Michael Stone
import React, { Component } from 'react';

class Song extends Component 
{
    render() 
    {
        return (
            <div>
                <h4>{this.props.song.title}</h4>
                <p>{this.props.song.artist}</p>
            </div>
        );
    }
}

export default Song;