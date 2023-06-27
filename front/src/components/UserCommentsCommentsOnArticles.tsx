import React, { useMemo } from 'react';
import { User } from '../model/models';
import Title from './static/Title';
import CommentsTabWithValidation from './CommentsTabWithValidation';
import CommentsTab from './CommentsTab';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { IData } from './UserComments';

const UserCommentsCommentsOnArticles = ({
  comments,
  refetch,
}: {
  comments: User['commentsOnArticles'];
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<IData>>;
}) => {
  const validatedComments = useMemo(() => {
    return comments.filter((comments) => comments.isValidated);
  }, [comments]);

  const notValidatedComments = useMemo(() => {
    return comments.filter((comments) => !comments.isValidated);
  }, [comments]);
  return (
    <div>
      <Title text="New comments" />
      <CommentsTabWithValidation refetch={refetch} comments={notValidatedComments} />
      <Title text="Comment on your articles" />
      <CommentsTab comments={validatedComments} />
    </div>
  );
};

export default UserCommentsCommentsOnArticles;
