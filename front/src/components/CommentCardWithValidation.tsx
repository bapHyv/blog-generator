import React from 'react';
import { IComment } from '../pages/Article';
import { AiOutlineUser } from 'react-icons/ai';
import formatedDate from '../utils/formatedDate';
import { Link } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import { customStyle } from './AddCommentTab';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { ApolloQueryResult, OperationVariables, gql, useMutation } from '@apollo/client';
import { IData } from './UserComments';

const DELETE_COMMENT = gql`
  mutation Mutation($commentId: Int!) {
    deleteOneArticleComment(commentId: $commentId) {
      id
    }
  }
`;

const VALIDATE_COMMENT = gql`
  mutation ValidateOneArticleComment($commentId: Int!) {
    validateOneArticleComment(commentId: $commentId) {
      id
    }
  }
`;

const CommentCardWithValidation = ({
  comment,
  refetch,
}: {
  comment: IComment;
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<IData>>;
}) => {
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { commentId: comment.id },
  });

  const [validateComment] = useMutation(VALIDATE_COMMENT, {
    variables: { commentId: comment.id },
  });

  return (
    <div className="p-5 text-black bg-white rounded">
      {/* USER */}
      <Link
        to={`/writers/${comment.publishedBy.id}`}
        className="flex items-end justify-center p-2 transition-all border-b border-gray-300 rounded-t bg-blue-50 gap-x-5 hover:bg-blue-100 hover:text-blue-500 hover:border-b-blue-500"
      >
        <AiOutlineUser className="w-8 h-8" />
        <h2 className="text-center">
          <span className="text-3xl">{comment.publishedBy.pseudo[0].toUpperCase()}</span>
          <span className="text-lg">{comment.publishedBy.pseudo.substring(1)}</span>
        </h2>
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-pink-700 rounded-full bg-pink-50 ring-1 ring-inset ring-pink-600/20">
          {comment.publishedBy.category.label[0].toUpperCase() +
            comment.publishedBy.category.label.substring(1)}
        </span>
        <p className="hidden px-2 py-1 mt-1 text-xs text-green-700 border rounded-full md:block bg-green-50 border-green-600/20">
          <span>
            {comment.publishedBy.followers.length} follower
            {comment.publishedBy.followers.length > 1 ? 's' : ''}
          </span>{' '}
          -{' '}
          <span>
            {comment.publishedBy.articles.length} article
            {comment.publishedBy.articles.length > 1 ? 's' : ''}
          </span>
        </p>
      </Link>
      <div className="flex gap-x-5">
        <div className="flex flex-col w-full gap-y-2">
          {/* DATES */}
          <span className="mt-1 text-sm italic">{formatedDate(comment.createdAt)}</span>

          {/* RATING */}
          {!!comment.note && (
            <div className="[&>span]:w-full">
              <Rating
                readOnly
                style={{ maxWidth: 150 }}
                value={comment.note}
                itemStyles={customStyle}
              />
            </div>
          )}

          {/* COMMENT */}
          <p>{comment.content}</p>
        </div>
        <div className="flex flex-col items-center justify-around">
          <CheckCircleIcon
            onClick={async () => {
              await validateComment();
              await refetch();
            }}
            className="w-10 h-10 text-green-400 cursor-pointer hover:text-green-500"
          />
          <XCircleIcon
            onClick={async () => {
              await deleteComment();
              await refetch();
            }}
            className="w-10 h-10 text-red-400 cursor-pointer hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CommentCardWithValidation;
