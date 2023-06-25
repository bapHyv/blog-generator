import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { ApolloError, gql, useSubscription } from '@apollo/client';

interface SubscribeContext {
  utils: {
    setNewNotif: React.Dispatch<React.SetStateAction<boolean>>;
    newNotif: boolean;
    setComment: React.Dispatch<React.SetStateAction<undefined>>;
  };
  acs: {
    loading: boolean;
    data: {
      newArticleComment: {
        id: number;
        content: string;
        publishedBy: {
          id: number;
          pseudo: string;
        };
        publishedOn: {
          id: number;
          label: string;
        };
      };
    };
    error: ApolloError | undefined;
  };
}

const NEW_ARTICLE_COMMENT = gql`
  subscription Subscription {
    newArticleComment {
      id
      content
      publishedBy {
        id
        pseudo
      }
      publishedOn {
        id
        label
      }
    }
  }
`;

const subscribeContext = React.createContext({} as SubscribeContext);

export function SubscribeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comment, setComment] = useState(undefined);
  const [newNotif, setNewNotif] = useState(false);

  const {
    loading: acLoading,
    data: acData,
    error: acError,
  } = useSubscription(NEW_ARTICLE_COMMENT, {
    skip: !user.id,
  });

  useEffect(() => {
    setComment((state) => {
      if (state !== acData) {
        setNewNotif(true);
        setComment(acData);
        return acData;
      }
    });
  }, [acData]);

  return (
    <subscribeContext.Provider
      value={{
        utils: {
          setComment,
          setNewNotif,
          newNotif,
        },
        acs: {
          loading: acLoading,
          data: acData,
          error: acError,
        },
      }}
    >
      {children}
    </subscribeContext.Provider>
  );
}

export function useSubscribe() {
  const subscribe = React.useContext(subscribeContext);
  return subscribe;
}

export default subscribeContext;
