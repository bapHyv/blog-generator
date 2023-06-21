import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import ArticleCard from '../components/ArticleCard';

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

export interface IArticle {
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
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    getAllArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const articleCardsPlaceholder = useMemo(() => {
    return new Array(5).fill(0).map((_, i) => {
      return (
        <div
          key={i + Math.random()}
          className="w-full h-40 mt-10 rounded-2xl bg-neutral-500 animate-pulse"
        ></div>
      );
    });
  }, []);

  return (
    <div className="flex flex-col px-20 py-10">
      {!!articles.length
        ? articles.map((article) => (
            <ArticleCard key={article.id + Math.random()} article={article} />
          ))
        : articleCardsPlaceholder}
    </div>
  );
};

export default Articles;
