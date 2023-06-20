import React from 'react';
import { IWriter } from '../pages/Writers';
import { Link } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useUser } from '../contexts/UserContext';

const WriterCard = ({ writer }: { writer: IWriter }) => {
  const { user } = useUser();
  return writer ? (
    <Link
      to={`/writers/${writer.id}`}
      className="flex flex-col p-5 mt-10 rounded-2xl bg-neutral-100 gap-y-5 hover:bg-neutral-200"
      key={writer.id + Math.random()}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-x-5">
          <img className="h-8" src="/user_icon.png" alt="" />
          <p>
            <span className="text-2xl">{writer.pseudo}</span> -{' '}
            <span className="text-2xl">{writer.category.label}</span>
          </p>
        </div>
        {user.id && (
          <button>
            <AiOutlineUserAdd className="w-8 h-8" />{' '}
          </button>
        )}
      </div>
      <div>
        <p>
          <span>
            {writer.followers.length} follower{writer.followers.length > 1 ? 's' : ''}
          </span>{' '}
          -{' '}
          <span>
            {writer.articles.length} article{writer.articles.length > 1 ? 's' : ''}
          </span>
        </p>
      </div>
      <div>
        <h3>Description</h3>
        <p className="mt-3">{writer.description}</p>
      </div>
    </Link>
  ) : (
    <div></div>
  );
};

export default WriterCard;
