import { gql, useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import WriterCard from '../components/WriterCard';
import ArticleCard from '../components/ArticleCard';
import { IArticle } from './Articles';
import CommentsTab from '../components/CommentsTab';
import AddCommentTab from '../components/AddCommentTab';
import { IComment, typeTab } from './Article';
import Title from '../components/static/Title';

const GET_WRITER = gql`
  query Query($writerId: Int!) {
    getOneWriter(writerId: $writerId) {
      id
      pseudo
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
        createdAt
        label
        content
        comments {
          id
        }
        publishedBy {
          id
          pseudo
        }
      }
      description
      commentsFromWriters {
        id
        note
        createdAt
        content
        publishedBy {
          id
          pseudo
          category {
            label
          }
          articles {
            id
          }
          followers {
            followed {
              id
            }
          }
        }
      }
    }
  }
`;

interface IWriter {
  description: string;
  id: number;
  pseudo: string;
  email: string;
  category: { id: number; label: string };
  followers: { id: number }[];
  articles: IArticle[];
  commentsFromWriters: IComment[];
}

interface IData {
  getOneWriter: IWriter;
}

const Writer = () => {
  const [tab, setTab] = useState<typeTab>('comments');
  const params = useParams();

  const { user } = useUser();

  const { data, loading } = useQuery<IData>(GET_WRITER, {
    variables: { writerId: params.writerId ? parseInt(params.writerId) : -1 },
    fetchPolicy: 'network-only',
  });

  const currentTab = useMemo(() => {
    switch (tab) {
      case 'comments':
        return <CommentsTab comments={data?.getOneWriter.commentsFromWriters || []} />;
      case 'addComment':
        return user.id ? (
          <AddCommentTab
            id={params.writerId ? parseInt(params.writerId) : -1}
            type="writer"
            setTab={setTab}
          />
        ) : (
          <p>You have to loggin to comment...</p>
        );

      default:
        return <CommentsTab comments={data?.getOneWriter.commentsFromWriters || []} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, data, user]);

  return (
    <div className="flex flex-col px-2 py-5 md:px-20 md:py-10 gap-y-10">
      <div>
        <Link to={'/writers'} className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Return to writers
        </Link>
      </div>
      {!loading ? (
        <>
          {' '}
          <div className="flex justify-center">
            <WriterCard writer={data?.getOneWriter || ({} as IWriter)} />
          </div>
          <div className="flex flex-col gap-y-5">
            <Title text="Articles" />
            {!!data?.getOneWriter.articles.length ? (
              <div className="overflow-y-scroll h-[50vh] shadow-inner">
                {data?.getOneWriter.articles.map((article) => (
                  <ArticleCard article={article} />
                ))}
              </div>
            ) : (
              <p>The writer has no article for the moment...</p>
            )}
          </div>
          <Title text="Comments" />
          <div className="flex p-2 bg-gray-300 rounded gap-x-10">
            <div
              className={`flex items-center border-b-2 border-white justify-center w-1/2 h-10 text-black cursor-pointer rounded-t bg-white transition-all ${
                tab === 'comments' ? 'border-b-2 border-blue-500 text-blue-500' : ''
              }`}
              onClick={() => setTab('comments')}
            >
              Comments
            </div>
            <div
              className={`flex items-center border-b-2 border-white justify-center w-1/2 h-10 text-black cursor-pointer rounded-t bg-white transition-all ${
                tab === 'addComment' ? 'border-b-2 border-blue-500 text-blue-500' : ''
              }`}
              onClick={() => setTab('addComment')}
            >
              Add a comment
            </div>
          </div>
          {currentTab}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
  //   return <div></div>;
};

export default Writer;
