import { gql, useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import Title from '../components/static/Title';

export const GET_ALL_ARTICLES = gql`
  query Query($skip: Int, $take: Int) {
    getAllArticles(skip: $skip, take: $take) {
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
  const [take, setTake] = useState(2);
  const { data, loading, fetchMore } = useQuery<IData>(GET_ALL_ARTICLES, {
    variables: {
      skip: 0,
      take,
    },
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

  const handleFetchMore = () => {
    const currentLenght = data?.getAllArticles.length || 0;
    fetchMore({ variables: { take: 2 } })
      .then((res) => {
        setTake(currentLenght + res.data?.getAllArticles.length);
      })
      .then(() => {
        setTimeout(() => {
          document.documentElement.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 30);
      });
  };

  return (
    <>
      <div className="flex flex-col px-2 py-5 md:px-20 md:py-10">
        <Title text="Articles" />
        {!loading
          ? data?.getAllArticles.map((article) => (
              <ArticleCard key={article.id + Math.random()} article={article} />
            ))
          : articleCardsPlaceholder}
      </div>
      <div className="flex justify-center mb-5">
        <button
          onClick={() => handleFetchMore()}
          className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Fetch More
        </button>
      </div>
    </>
  );
};

export default Articles;
