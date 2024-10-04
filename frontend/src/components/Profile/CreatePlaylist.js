//Michael Stone - u21497682
import React, { Component } from 'react';

class CreatePlaylist extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      picture: '',
      name: '',
      author: this.props.currentUser,  // Automatically set to the current user
      genre: '',
      category: '',
      hashtags: '',
      description: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) 
  {
    const { name, value, files } = event.target;
    this.setState({
      [name]: files ? files[0] : value  // Handle file input separately
    });
  }

  // handleSubmit(event) 
  // {
  //   event.preventDefault();

  //   const newPlaylist = { ...this.state };
    
  //   // Call the parent method passed as prop to add a new playlist
  //   this.props.addPlaylist(newPlaylist);  

  //   // Reset form after submission
  //   this.setState({
  //     picture: '',
  //     name: '',
  //     genre: '',
  //     category: '',
  //     hashtags: '',
  //     description: ''
  //   });
  // }

  handleSubmit(event) {
    event.preventDefault();

    const newPlaylist = {
      ...this.state,
      ownerId: this.props.profile.simpleId // Ensure to send the ownerId
    };

    // Send the new playlist to the backend
    fetch('http://localhost:3000/api/addPlaylist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlaylist),
    })
      .then(response => response.json())
      .then(data => {
        if (data.playlist) {
          // Call the parent method passed as prop to add a new playlist
          this.props.addPlaylist(data.playlist);
        } else {
          console.error('Error creating playlist:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Reset form after submission
    this.setState({
      picture: '',
      name: '',
      genre: '',
      category: '',
      hashtags: '',
      description: ''
    });
  }

  render() 
  {
    return (
      <div className="create-playlist">
        <h2>Create a New Playlist</h2>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Playlist Picture</label>
            <input type="file" name="picture" onChange={this.handleInputChange} accept="image/*" />
          </div>

          <div>
            <label>Playlist Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} required />
          </div>

          <div>
            <label>Author</label>
            <input type="text" name="author" value={this.state.author} readOnly />
          </div>

          <div>
            <label>Genre</label>
            <input type="text" name="genre" value={this.state.genre} onChange={this.handleInputChange} required />
          </div>

          <div>
            <label>Category</label>
            <input type="text" name="category" value={this.state.category} onChange={this.handleInputChange} required />
          </div>

          <div>
            <label>Hashtags</label>
            <input type="text" name="hashtags" value={this.state.hashtags} onChange={this.handleInputChange} placeholder="#tag1 #tag2" />
          </div>

          <div>
            <label>Description</label>
            <textarea name="description" value={this.state.description} onChange={this.handleInputChange} required />
          </div>
          
          <button type="submit">Create Playlist</button>
        </form>
      </div>
    );
  }
}

export default CreatePlaylist;