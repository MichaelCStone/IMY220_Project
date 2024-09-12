// Michael Stone - u21497682
import React, { Component } from 'react';

class EditPlaylist extends Component 
{
  constructor(props) 
  {
    super(props);
    
    this.state = { ...props.playlist };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);  // Pass updated playlist data to the parent component
  }

  render() {
    const { picture, name, genre, category, hashtags, description } = this.state;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="Playlist Name" />
        <input type="text" name="genre" value={genre} onChange={this.handleChange} placeholder="Genre" />
        <input type="text" name="category" value={category} onChange={this.handleChange} placeholder="Category" />
        <input type="text" name="hashtags" value={hashtags} onChange={this.handleChange} placeholder="Hashtags (comma-separated)" />
        <textarea name="description" value={description} onChange={this.handleChange} placeholder="Description"></textarea>
        <input type="url" name="picture" value={picture} onChange={this.handleChange} placeholder="Picture URL" />
        <button type="submit">Save Changes</button>
      </form>
    );
  }
}

export default EditPlaylist;