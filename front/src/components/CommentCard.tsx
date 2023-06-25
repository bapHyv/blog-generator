import React from 'react';
import { IComment } from '../pages/Article';
import { AiOutlineUser } from 'react-icons/ai';
import formatedDate from '../utils/formatedDate';
import { Link } from 'react-router-dom';
import Stars from './Stars';

const CommentCard = ({ comment }: { comment: IComment }) => {
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
      {/* DATES */}
      <span className="mt-1 text-sm italic">{formatedDate(comment.createdAt)}</span>

      {/* RATING */}
      {!!comment.note && (
        <div className="[&>span]:w-full">
          <Stars className="h-8 desktop:h-8 desktop:w-2/3" rating={comment.note} />
        </div>
      )}

      {/* COMMENT */}
      <p>{comment.content}</p>
    </div>
  );
};

export default CommentCard;
