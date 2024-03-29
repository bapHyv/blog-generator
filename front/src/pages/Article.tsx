import { gql, useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentsTab from '../components/CommentsTab';
import AddCommentTab from '../components/AddCommentTab';
import { useUser } from '../contexts/UserContext';
import Title from '../components/static/Title';

const GET_ARTICLE = gql`
  query Query($getOneArticleId: Int!) {
    getOneArticle(id: $getOneArticleId) {
      label
      content
      createdAt
      publishedBy {
        id
        pseudo
      }
      comments {
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
        isValidated
      }
    }
  }
`;

interface IPublishedBy {
  id: number;
  pseudo: string;
  category: { label: string };
  articles: { id: number }[];
  followers: { followed: { id: number } }[];
}

export interface IComment {
  id: number;
  note: number;
  createdAt: string;
  content: string;
  publishedBy: IPublishedBy;
  isValidated: boolean;
}

interface IArticle {
  createdAt: string;
  content: string;
  label: string;
  comments: IComment[];
  publishedBy: {
    id: number;
    pseudo: string;
  };
}

interface IData {
  getOneArticle: IArticle;
}

export type typeTab = 'comments' | 'addComment';

function Article() {
  const [tab, setTab] = useState<typeTab>('comments');
  const params = useParams();

  const { user } = useUser();

  const { data, loading } = useQuery<IData>(GET_ARTICLE, {
    variables: { getOneArticleId: params.articleId ? parseInt(params.articleId) : -1 },
    fetchPolicy: 'network-only',
  });

  const currentTab = useMemo(() => {
    switch (tab) {
      case 'comments':
        return <CommentsTab comments={data?.getOneArticle.comments || []} />;
      case 'addComment':
        return user.id ? (
          <AddCommentTab
            id={params.articleId ? parseInt(params.articleId) : -1}
            type="article"
          />
        ) : (
          <p>You have to loggin to comment...</p>
        );
      default:
        return <CommentsTab comments={data?.getOneArticle.comments || []} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, user, data, loading]);

  return (
    <div className="min-h-screen py-10 px-28">
      <div className="mt-5 mb-5">
        <Link to={'/articles'} className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Return to articles
        </Link>
      </div>
      {!loading ? (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Title text={data?.getOneArticle.label || ''} />
            {/* <p>
                Written by: <span className="text-xl">{data?.getOneArticle.publishedBy.pseudo}</span>
              </p> */}
          </div>

          <p>{new Array(10).fill(0).map((e) => data?.getOneArticle.content)}</p>

          <div className="flex p-2 my-10 bg-gray-300 rounded gap-x-10">
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
        </div>
      ) : (
        <div className="h-screen bg-gray-200 rounded-3xl animate-pulse"></div>
      )}
    </div>
  );
}

export default Article;
