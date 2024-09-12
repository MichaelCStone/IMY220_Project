//Michael Stone - u21497682
import React, { Component } from 'react';

class Comment extends Component 
{
  render() 
  {
    const { comment } = this.props;

    return (
        <div className="comment-component">
          {/* <img src={comment.picture} alt={`${author}'s avatar`} style={{ width: '50px', height: '50px' }} /> */}
          <p>{comment.author}: {comment.content}</p>
        </div>
      );
  }
}

export default Comment;