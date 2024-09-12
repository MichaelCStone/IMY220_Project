// Michael Stone - u21497682
import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component 
{
  render() 
  {
    const { comments } = this.props;

    return (
      <div className="comment-list">
        <h3>Comments</h3>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    );
  }
}

export default CommentList;