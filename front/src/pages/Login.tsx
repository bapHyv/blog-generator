import '../App.css';
import { BsGoogle } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useUser } from '../contexts/UserContext';

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      writer {
        avatar
        blogLabel
        category {
          id
          label
        }
        createdAt
        description
        email
        id
        pseudo
        followers {
          followed {
            id
            email
          }
        }
        following {
          following {
            id
            email
          }
        }
      }
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setLocalUser } = useUser();
  const [login] = useMutation(LOGIN, {
    variables: { email, password },
    onCompleted: async (data) => {
      const { login } = data;
      console.log(data);
      localStorage.setItem('token', login.token);
      setLocalUser(login.writer);
      navigate(`/profile/${login.writer.pseudo}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleKeyPressed = (e: any) => {
    if (e.keyCode === 13) {
      login();
    }
  };

  return (
    <div className="login-main-wrapper">
      <div className="login-wrapper">
        <p className="top-login">Login</p>
        <div className="login-form-container">
          <label className="username-container">
            <p>Mail</p>
            <div className="username-input-container">
              <div className="login-icon-user">
                <AiOutlineUser />
              </div>
              <input
                type="text"
                placeholder="Type your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
          <div className="login-separator"></div>
          <label className="password-container">
            <p>Password</p>
            <div className="password-input-container">
              <div className="login-icon-lock">
                <AiOutlineLock />
              </div>
              <input
                type="password"
                placeholder="Type your password"
                value={password}
                onKeyDown={(e) => handleKeyPressed(e)}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <div className="login-separator"></div>
        </div>
        <div className="login-forgot-password-container">
          <p className="login-forgot-password">Forgot password ?</p>
        </div>
        <button className="login-btn" onClick={() => login()}>
          LOGIN
        </button>
        <p className="signup-social">Or Sign Up Using</p>
        <div className="login-social-container">
          <div className="login-icon-google">
            <BsGoogle />
          </div>
          <div className="login-icon-facebook">
            <FaFacebookF />
          </div>
          <div className="login-icon-twitter">
            <FiTwitter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
