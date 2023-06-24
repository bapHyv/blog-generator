import '../App.css';
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useUser } from '../contexts/UserContext';
import Title from '../components/static/Title';

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
  const [isPassword, setIsPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { setLocalUser } = useUser();

  const [login, { error }] = useMutation(LOGIN, {
    variables: { email, password },
    onCompleted: async (data) => {
      const { login } = data;

      localStorage.setItem('token', login.token);

      setLocalUser(login.writer);

      navigate(`/profile/${login.writer.pseudo}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      <Title text="Login" />
      <div className="w-5/6 p-5 m-auto text-white bg-gray-700 rounded shadow-lg md:w-1/2">
        <form action="" className="flex flex-col gap-y-10" onSubmit={(e) => onSubmit(e)}>
          <div className="flex gap-x-5">
            <div className="flex">
              <AiOutlineMail className="w-8 h-8 mb-2" />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="email" className="text-xl">
                E-mail
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className={`text-gray-700 w-full border rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 ${
                  error?.message === 'No such writer found' ? 'border-red-500' : ''
                }`}
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {error?.message === 'No such writer found' && (
                <span className="text-red-500">No such writer found</span>
              )}
            </div>
          </div>

          <div className="flex gap-x-5">
            <div className="flex">
              <AiOutlineLock className="w-8 h-8" />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="password" className="text-xl">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={isPassword ? 'password' : 'text'}
                  name="password"
                  id="password"
                  className={`text-gray-700 w-full border rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-bluering-blue-500 ${
                    error?.message === 'Invalid password' ? 'border-red-500' : ''
                  }`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="absolute top-1 right-2">
                  {isPassword && (
                    <AiFillEye
                      className="w-8 h-8 text-gray-700 cursor-pointer"
                      onClick={() => setIsPassword(false)}
                    />
                  )}
                  {!isPassword && (
                    <AiFillEyeInvisible
                      className="w-8 h-8 text-gray-700 cursor-pointer"
                      onClick={() => setIsPassword(true)}
                    />
                  )}
                </div>
              </div>
              {error?.message === 'Invalid password' && (
                <span className="text-red-500">Wrong password</span>
              )}
            </div>
          </div>

          <input
            type="submit"
            value="Login"
            className="text-white bg-blue-500 border-0 rounded form-input"
          />
        </form>
        <div className="mt-10">
          <p>
            No account?{' '}
            <Link to={'/registration'} className="text-blue-300 underline">
              Sign up here !
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
