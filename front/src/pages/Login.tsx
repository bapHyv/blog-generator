import '../App.css';
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
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
        role
        pseudo
        id
        blogLabel
        avatar
        email
        description
        createdAt
        following {
          following {
            id
            email
            pseudo
          }
        }
        followers {
          followed {
            id
            email
            pseudo
          }
        }
        category {
          id
          label
        }
        articles {
          id
          isPublished
          label
          createdAt
          content
          comments {
            id
            note
          }
          publishedBy {
            id
            pseudo
            description
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
    <div className="px-5 py-5">
      <Title text="Login" />
      <div className="w-full p-5 m-auto text-white bg-gray-700 rounded shadow-lg lg:w-1/2">
        <div className="flex justify-center my-5">
          <AiOutlineUser className="w-20 h-20 text-gray-700 bg-white border border-white rounded-full" />
        </div>
        <form action="" className="flex flex-col gap-y-10" onSubmit={(e) => onSubmit(e)}>
          <div className="flex gap-x-5">
            <div className="hidden md:block">
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
                  error?.message === 'The writer either does not exist or the password is wrong'
                    ? 'border-red-500'
                    : ''
                }`}
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {error?.message === 'The writer either does not exist or the password is wrong' && (
                <span className="text-red-500">
                  The writer either does not exist or the password is wrong
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-x-5">
            <div className="hidden md:block">
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
                    error?.message === 'The writer either does not exist or the password is wrong'
                      ? 'border-red-500'
                      : ''
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
              {error?.message === 'The writer either does not exist or the password is wrong' && (
                <span className="text-red-500">
                  The writer either does not exist or the password is wrong
                </span>
              )}
            </div>
          </div>

          <input
            type="submit"
            value="Login"
            className="text-white transition-all bg-blue-500 border-0 rounded hover:bg-blue-600 form-input"
          />
        </form>
        <div className="mt-10">
          <p className="text-right">
            No account?{' '}
            <Link to={'/registration'} className="text-blue-300 underline">
              Sign up here !
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
