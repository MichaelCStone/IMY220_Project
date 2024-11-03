// Michael Stone - u21497682
import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component 
{
  render() {
    const { comments = [] } = this.props; // Set a default empty array if comments is undefined

    return (
      <div className="comment-list">
        <h3>Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    );
  }
}

export default CommentList;