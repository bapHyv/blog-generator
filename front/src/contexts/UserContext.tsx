import { gql, useQuery } from '@apollo/client';
import React, { useMemo, useState } from 'react';
import { User } from '../model/models';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';

interface UserContext {
  user: User;
  setLocalUser: React.Dispatch<React.SetStateAction<User>>;
  loading: boolean;
  avatar: JSX.Element | undefined;
}

const AUTO_LOGIN = gql`
  query AutoLogin($token: String!) {
    autoLogin(token: $token) {
      id
      pseudo
      role
      avatar
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
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dr0zu0121',
    },
  });

  const [localUser, setLocalUser] = useState<User>({} as User);

  const { loading } = useQuery(AUTO_LOGIN, {
    variables: { token: localStorage.getItem('token') },
    skip: !!localUser.id,
    onCompleted: (data) => setLocalUser(data.autoLogin),
  });

  const avatar = useMemo(() => {
    if (localUser.avatar) {
      const cldImg = cld.image(localUser.avatar);
      cldImg.resize(fill().height(150));
      return <AdvancedImage cldImg={cldImg} />;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser.avatar]);

  return (
    <userContext.Provider
      value={{
        user: localUser,
        setLocalUser,
        loading,
        avatar,
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
