// Michael Stone - u21497682
import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component 
{
  render() {
    const { comments = [] } = this.props; // Set a default empty array if comments is undefined

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
        
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
      </div>
    );
  }
}

export default CommentList;