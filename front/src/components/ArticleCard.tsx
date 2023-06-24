import React from 'react';
import { IArticle } from '../pages/Articles';
import { Link } from 'react-router-dom';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';

const ArticleCard = ({ article }: { article: IArticle }) => {
  const formatedDate = (date: string) => {
    const _date = new Date(date);
    return `${_date.getDay() < 10 ? `0${_date.getDay()}` : _date.getDay()}-${
      _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth()
    }-${_date.getFullYear()}`;
  };

  return (
    <div className="flex flex-col p-5 mt-10 text-white bg-gray-700 rounded-2xl gap-x-5">
      <Link
        to={`/articles/${article.id}`}
        className="flex flex-col p-2 transition-all rounded gap-y-5 hover:bg-gray-800"
        key={article.id + Math.random()}
      >
        <div className="flex items-center border-b border-white gap-x-2">
          <HiOutlineNewspaper className="w-6 h-6" />
          <h2>
            <span className="text-3xl">{article.label[0]}</span>
            <span className="text-lg">{article.label.substring(1)}</span>
          </h2>
        </div>
        <div>
          <span>Published: {formatedDate(article.createdAt)}</span>
        </div>
        <div>
          <p className="italic">{article.content}</p>
        </div>
        <div className="border-t border-white">
          <span>
            <span>{article.comments.length} comments</span>
          </span>
        </div>
      </Link>
      <div className="flex justify-end mt-3">
        <Link
          to={`/writers/${article.publishedBy.id}`}
          className="p-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 flex gap-x-2 max-w-max transition-all"
        >
          <AiOutlineUser className="w-6 h-6 border-2 border-white rounded-full" />
          <span>{article.publishedBy.pseudo}</span>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
