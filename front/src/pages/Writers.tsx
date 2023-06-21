import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import WriterCard from '../components/WriterCard';

/**
 * Créer un composant ArticleCard
 * Mettre un lien sur le pseudo du writer dans les articleCards
 * Mettre un lien sur le pseudo du writer dans les CommentCards
 */

export const GET_ALL_WRITERS = gql`
  query Query {
    getAllWriters {
      id
      pseudo
      description
      category {
        id
        label
      }
      followers {
        followed {
          id
        }
      }
      articles {
        id
      }
    }
  }
`;

export interface IWriter {
  description: string;
  id: number;
  pseudo: string;
  category: { id: number; label: string };
  followers: { id: number }[];
  articles: { id: number }[];
}

const Writers = () => {
  const [writers, setWriters] = useState<IWriter[]>([]);

  const [getAllWriters] = useLazyQuery(GET_ALL_WRITERS, {
    onCompleted: async (data) => {
      setWriters(data.getAllWriters);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    getAllWriters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(writers);

  return (
    <div>
      <div className="flex flex-col px-20 py-10">
        {!!writers.length ? (
          writers.map((writer) => <WriterCard key={writer.id + Math.random()} writer={writer} />)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Writers;
