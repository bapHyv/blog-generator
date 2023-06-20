import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentsTab from '../components/CommentsTab';
import AddCommentTab from '../components/AddCommentTab';
import { useUser } from '../contexts/UserContext';

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
        publishedBy {
          id
          pseudo
        }
        content
        createdAt
      }
    }
  }
`;

export interface IComment {
  content: string;
  createdAt: string;
  id: number;
  note: number;
  publishedBy: { id: number; pseudo: string };
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

function Article() {
  const [article, setArticle] = useState<IArticle>({} as IArticle);
  const [tab, setTab] = useState('comments');
  const params = useParams();

  const { user } = useUser();

  const [getArticle] = useLazyQuery(GET_ARTICLE, {
    variables: { getOneArticleId: params.articleId ? parseInt(params.articleId) : -1 },
    onCompleted: async (data) => {
      setArticle(data.getOneArticle);
    },
  });

  console.log(user);

  useEffect(() => {
    getArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentTab = useMemo(() => {
    switch (tab) {
      case 'comments':
        return <CommentsTab comments={article.comments || []} />;
      case 'addComment':
        return user.id ? (
          <AddCommentTab articleId={params.articleId ? parseInt(params.articleId) : -1} />
        ) : (
          <p>You have to loggin to comment...</p>
        );

      default:
        return <CommentsTab comments={article.comments || []} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, article, user]);

  return (
    <>
      <div className="min-h-screen py-10 px-28">
        <div className="mt-5 mb-10">
          <Link to={'/articles'} className="p-2 text-white rounded bg-neutral-700">
            Return to articles
          </Link>
        </div>
        {article ? (
          <div className="flex flex-col gap-y-10">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl">{article.label}</h1>
              {/* <p>
                Written by: <span className="text-xl">{article.publishedBy.pseudo}</span>
              </p> */}
            </div>
            <p>{new Array(10).fill(0).map((e) => article.content)}</p>
            <div className="flex gap-x-10">
              <div
                className={`flex items-center justify-center w-1/2 h-10 cursor-pointer rounded-t-xl hover:bg-neutral-300 ${
                  tab === 'comments' ? 'bg-neutral-300' : 'bg-neutral-100'
                }`}
                onClick={() => setTab('comments')}
              >
                Comments
              </div>
              <div
                className={`flex items-center justify-center w-1/2 h-10 cursor-pointer rounded-t-xl hover:bg-neutral-300 ${
                  tab === 'addComment' ? 'bg-neutral-300' : 'bg-neutral-100'
                }`}
                onClick={() => setTab('addComment')}
              >
                Add a comment
              </div>
            </div>
            {currentTab}
          </div>
        ) : (
          <div className="h-screen rounded-3xl bg-neutral-500 animate-pulse"></div>
        )}
      </div>
    </>
  );
}

export default Article;
