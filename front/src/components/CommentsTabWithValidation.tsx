import React, { useMemo } from 'react';
import { IComment } from '../pages/Article';
import CommentCardWithValidation from './CommentCardWithValidation';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { IData } from './UserComments';

const CommentsTabWithValidation = ({
  comments,
  refetch,
}: {
  comments: IComment[];
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<IData>>;
}) => {
  const _comments = useMemo(() => {
    const local = [];
    for (let i = 0; i < comments.length; i++) {
      local.push(comments[comments.length - i - 1]);
    }
    return local;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments.length, comments]);

  return !!_comments.length ? (
    <div className="flex flex-col p-2 bg-gray-300 rounded gap-y-2">
      {_comments.map((comment) => (
        <CommentCardWithValidation refetch={refetch} key={comment.id} comment={comment} />
      ))}
    </div>
  ) : (
    <p>There is no comment yet...</p>
  );
};

export default CommentsTabWithValidation;
