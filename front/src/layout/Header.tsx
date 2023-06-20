import { useApolloClient } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-removebg-preview.png';
import { useUser } from '../contexts/UserContext';
import { User } from '../model/models';

function Header() {
  const { user } = useUser();
  const { resetStore } = useApolloClient();
  const { setLocalUser } = useUser();
  const navigate = useNavigate();

  const logout = () => {
    resetStore();
    localStorage.removeItem('token');
    setLocalUser({} as User);
    navigate('/');
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
      <div className="flex justify-end w-1/5">
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
