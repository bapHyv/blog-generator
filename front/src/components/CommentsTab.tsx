import React from 'react';
import { IComment } from '../pages/Article';
import CommentCard from './CommentCard';

const CommentsTab = ({ comments }: { comments: IComment[] }) => {
  return (
    <div className="flex flex-col gap-y-5">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsTab;
