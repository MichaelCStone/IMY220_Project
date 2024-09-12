// Michael Stone - u21497682
import React, { Component } from 'react';

class AddComment extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = { comment: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) 
  {
    this.setState({ comment: event.target.value });
  }

  handleSubmit(event) 
  {
    event.preventDefault();

    const newComment = {
    //   picture: this.props.userPicture,  // Assuming you pass user's picture as a prop
      author: this.props.userName,  // Assuming you pass user's name as a prop
      content: this.state.comment,
    };

    this.props.onAddComment(newComment);

    this.setState({ comment: '' });  // Reset comment field
  }

  render() 
  {
    return (
        <form onSubmit={this.handleSubmit}>
            <textarea value={this.state.comment} onChange={this.handleChange} placeholder="Write your comment..."></textarea>
            <button type="submit">Add Comment</button>
        </form>
    );
  }
}

export default AddComment;