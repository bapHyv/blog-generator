import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export const GET_ALL_ARTICLES = gql`
  query Query {
    getAllArticles {
      id
      label
      createdAt
      content
      publishedBy {
        id
        pseudo
      }
      comments {
        id
        note
      }
    }
  }
`;

interface IArticle {
  id: number;
  label: string;
  createdAt: string;
  content: string;
  publishedBy: {
    id: number;
    pseudo: string;
  };
  comments: [{ id: number; note: number }];
}

const Articles = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  const [getAllArticles] = useLazyQuery(GET_ALL_ARTICLES, {
    onCompleted: async (data) => {
      setArticles(data.getAllArticles);
    },
  });

  useEffect(() => {
    getAllArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const articleCardsPlaceholder = useMemo(() => {
    return new Array(5).fill(0).map((e) => {
      return <div className="w-full h-40 mt-10 rounded-2xl bg-neutral-500 animate-pulse"></div>;
    });
  }, []);

  return (
    <div className="flex flex-col px-20 py-10">
      {!!articles.length
        ? articles.map((article) => (
            <Link
              to={`/articles/${article.id}`}
              className="flex flex-col p-5 mt-10 rounded-2xl bg-neutral-100 gap-y-5 hover:bg-neutral-200"
              key={article.id + Math.random()}
            >
              <div className="flex justify-between">
                <h2>{article.label}</h2>
                <span>{article.publishedBy.pseudo}</span>
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
          ))
        : articleCardsPlaceholder}
    </div>
  );
};

export default Articles;
