import { gql, useQuery } from '@apollo/client';
import WriterCard from '../components/WriterCard';
import Title from '../components/static/Title';

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

interface IData {
  getAllWriters: IWriter[];
}

const Writers = () => {
  const { data, loading } = useQuery<IData>(GET_ALL_WRITERS, {
    fetchPolicy: 'network-only',
  });

  return (
    <div>
      <div className="flex flex-col w-full px-20 py-10">
        <Title text="Writers" />
        {!loading ? (
          data?.getAllWriters.map((writer) => (
            <WriterCard key={writer.id + Math.random()} writer={writer} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Writers;
