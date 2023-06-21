import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import WriterCard from '../components/WriterCard';
import ArticleCard from '../components/ArticleCard';
import { IArticle } from './Articles';
import CommentsTab from '../components/CommentsTab';
import AddCommentTab from '../components/AddCommentTab';
import { IComment, typeTab } from './Article';

const GET_WRITER = gql`
  query Query($writerId: Int!) {
    getOneWriter(writerId: $writerId) {
      pseudo
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
        createdAt
        content
        note
        publishedBy {
          id
          pseudo
        }
      }
    }
  }
`;

interface IWriter {
  description: string;
  id: number;
  pseudo: string;
  category: { id: number; label: string };
  followers: { id: number }[];
  articles: IArticle[];
  commentsFromWriters: IComment[];
}

const Writer = () => {
  const [writer, setWriter] = useState<IWriter | null>(null);

  const [tab, setTab] = useState<typeTab>('comments');
  const params = useParams();

  const { user } = useUser();

  const [getWriter, { refetch }] = useLazyQuery(GET_WRITER, {
    variables: { writerId: params.writerId ? parseInt(params.writerId) : -1 },
    onCompleted: async (data) => {
      setWriter(data.getOneWriter);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    getWriter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(writer);

  const currentTab = useMemo(() => {
    switch (tab) {
      case 'comments':
        return <CommentsTab comments={writer?.commentsFromWriters || []} />;
      case 'addComment':
        return user.id ? (
          <AddCommentTab
            id={params.writerId ? parseInt(params.writerId) : -1}
            type="writer"
            refetch={refetch}
            setTab={setTab}
          />
        ) : (
          <p>You have to loggin to comment...</p>
        );

      default:
        return <CommentsTab comments={writer?.commentsFromWriters || []} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, writer, user]);

  return (
    <div className="flex flex-col px-20 py-10 gap-y-10">
      <div className="">
        <Link to={'/writers'} className="p-2 text-white rounded bg-neutral-700">
          Return to writers
        </Link>
      </div>
      {writer ? (
        <>
          {' '}
          <WriterCard writer={writer} />
          <div className="h-0.5 bg-black"></div>
          <div className="flex flex-col gap-y-5">
            <h2 className="text-3xl">Articles</h2>
            <div className="overflow-y-scroll h-[50vh] shadow-inner">
              {writer.articles.map((article) => (
                <ArticleCard article={article} />
              ))}
            </div>
          </div>
          <div className="h-0.5 bg-black"></div>
          <h2 className="text-3xl">Comments</h2>
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
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
  //   return <div></div>;
};

export default Writer;
