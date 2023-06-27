import React from 'react';
import { User } from '../model/models';
import CommentsTab from './CommentsTab';

const UserCommentsMyComments = ({ comments }: { comments: User['commentsOnArticles'] }) => {
  return <CommentsTab comments={comments} />;
};

export default UserCommentsMyComments;
