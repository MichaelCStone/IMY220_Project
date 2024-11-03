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
    // const { name, value, files } = event.target;
    // this.setState({
    //   [name]: files ? files[0] : value  // Handle file input separately
    // });
    const { name, value, files } = event.target;

    if (name === 'picture' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ picture: reader.result }); // Set the Base64 string
      };
      reader.readAsDataURL(files[0]);
    } else {
      this.setState({
        [name]: value
      });
    }
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
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Create a New Playlist</h2>

        <form onSubmit={this.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Playlist Picture</label>
            <input
              type="file"
              name="picture"
              onChange={this.handleInputChange}
              accept="image/*"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Playlist Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={this.state.author}
              readOnly
              className="mt-1 p-2 w-full border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            <input
              type="text"
              name="genre"
              value={this.state.genre}
              onChange={this.handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hashtags</label>
            <input
              type="text"
              name="hashtags"
              value={this.state.hashtags}
              onChange={this.handleInputChange}
              placeholder="#tag1 #tag2"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Playlist
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePlaylist;