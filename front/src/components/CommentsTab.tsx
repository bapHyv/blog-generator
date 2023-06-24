import React from 'react';
import { IComment } from '../pages/Article';
import CommentCard from './CommentCard';

const CommentsTab = ({ comments }: { comments: IComment[] }) => {
  return !!comments.length ? (
    <div className="flex flex-col p-2 bg-gray-300 rounded gap-y-2">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  ) : (
    <></>
  );
};

export default CommentsTab;
