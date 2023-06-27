import React, { useMemo, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import UserCommentsMyComments from './UserCommentsMyComments';
import UserCommentsCommentsOnArticles from './UserCommentsCommentsOnArticles';
import { gql, useQuery } from '@apollo/client';
import { IComment } from '../model/models';

type typeTab = 'articles' | 'profile' | 'myComments';

const GET_ALL_COMMENTS = gql`
  query GetOneWriter($writerId: Int!) {
    getOneWriter(writerId: $writerId) {
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
        isValidated
      }
      commentsOnArticles {
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
      commentsOnWriters {
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
      articles {
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
  }
`;

export type IData = {
  getOneWriter: {
    commentsFromWriters: IComment[];
    commentsOnArticles: IComment[];
    commentsOnWriters: IComment[];
    articles: { comments: IComment[] }[];
  };
};

const UserComments = () => {
  const { user } = useUser();
  const [tab, setTab] = useState<typeTab>('articles');

  const { data, loading, refetch } = useQuery<IData>(GET_ALL_COMMENTS, {
    variables: { writerId: user.id },
    fetchPolicy: 'network-only',
  });

  const commentsOnArticles = useMemo(() => {
    const _commentsOnArticles: IComment[] = [];

    if (data) {
      data.getOneWriter.articles.forEach((article) => {
        article.comments.forEach((comment) => _commentsOnArticles.push(comment));
      });
      return _commentsOnArticles;
    }

    return _commentsOnArticles;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  const currentTab = useMemo(() => {
    switch (tab) {
      case 'articles':
        return (
          <UserCommentsCommentsOnArticles refetch={refetch} comments={commentsOnArticles || []} />
        );
      case 'myComments':
        return (
          <UserCommentsMyComments
            comments={
              data?.getOneWriter.commentsOnArticles.concat(data.getOneWriter.commentsOnWriters) ||
              []
            }
          />
        );

      default:
        return (
          <UserCommentsCommentsOnArticles
            refetch={refetch}
            comments={data?.getOneWriter.commentsFromWriters || []}
          />
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tab,
    refetch,
    data?.getOneWriter.commentsFromWriters,
    data?.getOneWriter.commentsOnArticles,
    data?.getOneWriter.commentsOnWriters,
    loading,
  ]);

  return (
    <div>
      <div className="flex p-2 bg-gray-300 rounded gap-x-10">
        <div
          className={`flex items-center border-b-2 border-white justify-center w-1/2 h-10 text-black cursor-pointer rounded-t bg-white transition-all ${
            tab === 'articles' ? 'border-b-2 border-blue-500 text-blue-500' : ''
          }`}
          onClick={() => setTab('articles')}
        >
          Articles
        </div>
        <div
          className={`flex items-center border-b-2 border-white justify-center w-1/2 h-10 text-black cursor-pointer rounded-t bg-white transition-all ${
            tab === 'profile' ? 'border-b-2 border-blue-500 text-blue-500' : ''
          }`}
          onClick={() => setTab('profile')}
        >
          Profile
        </div>
        <div
          className={`flex items-center border-b-2 border-white justify-center w-1/2 h-10 text-black cursor-pointer rounded-t bg-white transition-all ${
            tab === 'myComments' ? 'border-b-2 border-blue-500 text-blue-500' : ''
          }`}
          onClick={() => setTab('myComments')}
        >
          My Comments
        </div>
      </div>
      {!loading ? currentTab : <div></div>}
    </div>
  );
};

export default UserComments;
