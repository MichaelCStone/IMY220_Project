// Michael Stone - u21497682
import React, { Component } from 'react';

class EditPlaylist extends Component 
{
  constructor(props) 
  {
    super(props);
    
    // this.state = { ...props.playlist };
    this.state = { 
      name: props.playlist.name,
      genre: props.playlist.genre,
      category: props.playlist.category,
      hashtags: props.playlist.hashtags,
      description: props.playlist.description
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.props.onSubmit(this.state);  // Pass updated playlist data to the parent component
  // }

  handleSubmit(event) {
    event.preventDefault();

    const updatedPlaylist = {
      ...this.props.playlist,
      name: this.state.name,
      genre: this.state.genre,
      category: this.state.category,
      hashtags: this.state.hashtags,
      description: this.state.description
    };

    // Use the correct prop name for updating the playlist
    this.props.onUpdatePlaylist(updatedPlaylist);
  }

  render() {
    const { name, genre, category, hashtags, description } = this.state; //add picture
    
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="Playlist Name" />
        <input type="text" name="genre" value={genre} onChange={this.handleChange} placeholder="Genre" />
        <input type="text" name="category" value={category} onChange={this.handleChange} placeholder="Category" />
        <input type="text" name="hashtags" value={hashtags} onChange={this.handleChange} placeholder="Hashtags (comma-separated)" />
        <textarea name="description" value={description} onChange={this.handleChange} placeholder="Description"></textarea>
        {/* add image section */}
        <button type="submit">Save Changes</button>
      </form>
    );
  }
}

export default EditPlaylist;