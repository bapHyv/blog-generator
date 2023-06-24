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
      email
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
  email: string;
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
      <div className="flex flex-col px-2 py-5 md:px-20 md:py-10">
        <Title text="Writers" />
        <div className="flex flex-wrap justify-around p-5 bg-gray-300 rounded gap-x-5 gap-y-5">
          {!loading ? (
            data?.getAllWriters.map((writer) => (
              <WriterCard key={writer.id + Math.random()} writer={writer} />
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Writers;
