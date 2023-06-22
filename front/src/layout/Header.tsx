import { useApolloClient } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-removebg-preview.png';
import { useUser } from '../contexts/UserContext';
import { User } from '../model/models';
import { useSubscribe } from '../contexts/subscribeContext';
import { AiFillBell } from 'react-icons/ai';
import { useState } from 'react';

function Header() {
  const { user } = useUser();
  const { resetStore } = useApolloClient();
  const { setLocalUser } = useUser();
  const navigate = useNavigate();
  const { acs, utils } = useSubscribe();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const logout = () => {
    resetStore();
    localStorage.removeItem('token');
    setLocalUser({} as User);
    navigate('/');
  };

  const handleClick = () => {
    if (!utils.newNotif) {
      setIsDrawerVisible(false);
    }
    if (utils.newNotif) {
      utils.setNewNotif(false);
      setIsDrawerVisible(true);
    }
    utils.setComment(undefined);
  };

  return (
    <header className="flex items-center justify-between p-5 bg-neutral-300">
      <div className="w-1/5">
        <Link to={`/`}>
          <img src={Logo} alt="logo" className="cursor-pointer h-14" />
        </Link>
      </div>
      <div className="flex w-3/5 gap-x-20">
        <Link to={'/articles'} className="text-xl">
          Articles
        </Link>
        <Link to={'/writers'} className="text-xl">
          Writers
        </Link>
      </div>
      <div className="flex items-center justify-end w-1/5">
        <div className="relative">
          <AiFillBell
            className={`w-8 h-8 text-ronniecolman ${
              utils.newNotif || isDrawerVisible ? 'cursor-pointer' : ''
            }`}
            onClick={() => handleClick()}
          />
          {utils.newNotif && (
            <div
              className="absolute flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full -bottom-1.5 -left-1.5"
              onClick={() => handleClick()}
            >
              1
            </div>
          )}
          {isDrawerVisible && (
            <div className="absolute border-2 border-black w-80 top-5 -left-[310px] bg-neutral-200">
              <p>
                New comment on:{' '}
                <Link
                  to={`/articles/${acs.data.newArticleComment.publishedOn.id}`}
                  onClick={() => setIsDrawerVisible(false)}
                >
                  <span className="text-xl underline">
                    {acs.data.newArticleComment.publishedOn.label}
                  </span>
                </Link>
              </p>
              <p>Comment:</p>
              <p>{acs.data.newArticleComment.content}</p>
              <p>
                From:{' '}
                <Link
                  to={`/writers/${acs.data.newArticleComment.publishedBy.id}`}
                  onClick={() => setIsDrawerVisible(false)}
                >
                  <span className="text-xl underline">
                    {acs.data.newArticleComment.publishedBy.pseudo}
                  </span>
                </Link>
              </p>
            </div>
          )}
        </div>
        {user.pseudo && (
          <>
            <Link to={`/userzzz`}>
              <button className="header-how">Profile</button>
            </Link>
            <button onClick={() => logout()} className="header-signup">
              Logout
            </button>
          </>
        )}
        {!user.pseudo && (
          <>
            <Link to={`/login`}>
              <button className="header-login">Log In</button>
            </Link>
            <Link to={`/registration`}>
              <button className="header-signup">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
