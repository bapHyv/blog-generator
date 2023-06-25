import { gql, useQuery } from '@apollo/client';
import WriterCard from '../components/WriterCard';
import Title from '../components/static/Title';
import { useState } from 'react';

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

export const GET_ALL_CATEGORIES = gql`
  query Query {
    getAllCategories {
      id
      label
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

interface ICategories {
  id: number;
  label: string;
}

interface IDataCategories {
  getAllCategories: ICategories[];
}

const Writers = () => {
  const [cat, setCat] = useState('');
  const { data, loading } = useQuery<IData>(GET_ALL_WRITERS, {
    fetchPolicy: 'network-only',
  });

  const { data: categories, loading: categoriesLoading } = useQuery<IDataCategories>(
    GET_ALL_CATEGORIES,
    {
      fetchPolicy: 'network-only',
    },
  );

  console.log(cat);

  return (
    <div className="flex flex-col px-2 py-5 md:px-20 md:py-10">
      <Title text="Writers" />
      {!categoriesLoading && (
        <div className="flex justify-end mb-5 gap-x-5">
          <select
            name="categories"
            id="categories"
            onChange={(e) => setCat(e.target.value)}
            value={cat}
          >
            {categories?.getAllCategories.map((cat) => (
              <option key={cat.label} value={cat.label}>
                {cat.label}
              </option>
            ))}
          </select>
          <button
            className="px-3 text-white bg-yellow-500 rounded hover:bg-yellow-600"
            onClick={() => setCat('')}
          >
            RESET
          </button>
        </div>
      )}
      <div className="flex flex-wrap justify-around p-5 bg-gray-300 rounded gap-x-5 gap-y-5">
        {!loading ? (
          data?.getAllWriters
            .filter((writer) => (!cat ? writer : writer.category.label === cat))
            .map((writer) => <WriterCard key={writer.id + Math.random()} writer={writer} />)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Writers;
