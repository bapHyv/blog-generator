import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { User } from '../model/models';

interface UserContext {
  user: User;
  setLocalUser: React.Dispatch<React.SetStateAction<User>>;
}

const GET_PHOTOS = gql`
  query Query($email: String!) {
    getOne(email: $email) {
      images {
        id
        url
      }
    }
  }
`;

const AUTO_LOGIN = gql`
  query AutoLogin($token: String!) {
    autoLogin(token: $token) {
      id
      pseudo
      role
      following {
        following {
          id
          pseudo
          email
        }
      }
      followers {
        followed {
          id
          email
          pseudo
        }
      }
      email
      blogLabel
      description
      category {
        id
        label
      }
      createdAt
    }
  }
`;

const userContext = React.createContext({} as UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [localUser, setLocalUser] = useState<User>({} as User);

  const { data, loading } = useQuery(AUTO_LOGIN, {
    variables: { token: localStorage.getItem('token') },
    skip: !!localUser.id,
    onCompleted: (data) => setLocalUser(data.autoLogin),
  });

  return (
    <userContext.Provider
      value={{
        user: localUser,
        setLocalUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const user = React.useContext(userContext);
  return user;
}

export default userContext;
