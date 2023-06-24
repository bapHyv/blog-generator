import '../App.css';
import { BsGoogle } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  console.log(error?.message);
  console.log(error?.name);

  return (
    <div className="min-h-screen">
      <h1 className="my-10 text-3xl text-center">Login</h1>
      <div className="w-1/3 p-5 m-auto rounded shadow-lg bg-neutral-100">
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
                className={`w-full border rounded form-input focus:ring-yeahbuddy focus:ring-1 focus:border-yeahbuddy ${
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
                  className={`w-full border rounded form-input focus:ring-yeahbuddy focus:ring-1 focus:border-yeahbuddy ${
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
                      className="w-8 h-8 cursor-pointer"
                      onClick={() => setIsPassword(false)}
                    />
                  )}
                  {!isPassword && (
                    <AiFillEyeInvisible
                      className="w-8 h-8 cursor-pointer"
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
            className="text-white border-0 rounded form-input bg-yeahbuddy"
          />
        </form>
        <div className="mt-10">
          <p>
            No account?{' '}
            <Link to={'/registration'} className="text-blue-500 underline">
              Sign up here !
            </Link>
          </p>
          <p>
            You forgot your password?{' '}
            <Link to={'/'} className="text-blue-500 underline">
              You can reset it here !
            </Link>
          </p>

          <div className="mt-10">
            <h2 className="text-xl text-center">Sign up using</h2>
            <div className="flex justify-center mt-5 gap-x-5">
              <div className="text-white bg-[#df4e3d] p-3 text-xl rounded-full">
                <BsGoogle />
              </div>
              <div className="text-white bg-[#3e5a97] p-3 text-xl rounded-full">
                <FaFacebookF />
              </div>
              <div className="text-white bg-[#549de3] p-3 text-xl rounded-full">
                <FiTwitter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
