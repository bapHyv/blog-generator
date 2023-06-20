import React from 'react';
import { IComment } from '../pages/Article';

const CommentCard = ({ comment }: { comment: IComment }) => {
  return (
    <div className="flex flex-col p-5 rounded-lg bg-neutral-100 gap-y-5">
      <p>
        <span>{comment.publishedBy.pseudo}</span> -{' '}
        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
      </p>
      <p>{comment.content}</p>
    </div>
  );
};

export default CommentCard;
