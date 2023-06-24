import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import ArticleCard from '../components/ArticleCard';
import Title from '../components/static/Title';

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
        description
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
    description: string;
  };
  comments: [{ id: number; note: number }];
}

interface IData {
  getAllArticles: IArticle[];
}

const Articles = () => {
  const { data, loading } = useQuery<IData>(GET_ALL_ARTICLES, {
    fetchPolicy: 'network-only',
  });

  const articleCardsPlaceholder = useMemo(() => {
    return new Array(5).fill(0).map((_, i) => {
      return (
        <div
          key={i + Math.random()}
          className="w-full h-40 mt-10 bg-gray-700 rounded-2xl animate-pulse"
        ></div>
      );
    });
  }, []);

  return (
    <div className="flex flex-col px-20 py-10">
      <Title text="Articles" />
      {!loading
        ? data?.getAllArticles.map((article) => (
            <ArticleCard key={article.id + Math.random()} article={article} />
          ))
        : articleCardsPlaceholder}
    </div>
  );
};

export default Articles;
