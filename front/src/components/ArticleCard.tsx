import React from 'react';
import { IArticle } from '../pages/Articles';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }: { article: IArticle }) => {
  return (
    <div className="flex p-5 mt-10 rounded-2xl bg-neutral-50 gap-x-5">
      <Link
        to={`/articles/${article.id}`}
        className="flex flex-col p-2 rounded gap-y-5 hover:bg-neutral-200"
        key={article.id + Math.random()}
      >
        <div className="flex justify-between">
          <h2>{article.label}</h2>
        </div>
        <div>
          <span>Published: {new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        <div>
          <p>{article.content}</p>
        </div>
        <div>
          <span>
            <span>{article.comments.length} comments</span>
          </span>
        </div>
      </Link>
      <div>
        <Link to={`/writers/${article.publishedBy.id}`}>
          <span className="p-1.5 rounded-lg bg-neutral-300 hover:bg-neutral-400">
            {article.publishedBy.pseudo}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
