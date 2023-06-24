import '../App.css';
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { GiFeather } from 'react-icons/gi';
import { BiCategoryAlt } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';
import { MdTitle } from 'react-icons/md';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../components/static/Title';

const SIGN_UP = gql`
  mutation Mutation(
    $pseudo: String!
    $email: String!
    $password: String!
    $description: String!
    $blogLabel: String!
    $categoryId: Int!
  ) {
    signup(
      pseudo: $pseudo
      email: $email
      password: $password
      description: $description
      blogLabel: $blogLabel
      categoryId: $categoryId
    ) {
      token
      writer {
        avatar
        blogLabel
        category {
          id
          label
        }
        description
        email
        id
        pseudo
        followers {
          followed {
            id
            pseudo
          }
        }
        following {
          following {
            id
            pseudo
          }
        }
      }
    }
  }
`;

const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      label
    }
  }
`;

interface ICategory {
  id: number;
  label: string;
}

interface ICategories {
  getAllCategories: ICategory[];
}

function Registration() {
  const [isPassword, setIsPassword] = useState(true);

  const [pseudo, setPseudo] = useState('');
  const [pseudoError, setPseudoError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [blogLabel, setBlogLabel] = useState('');
  const [blogLabelError, setBlogLabelError] = useState(false);

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);

  const [category, setCategory] = useState('divers');
  const [categoryError, setCategoryError] = useState(false);

  const { data: categories, loading } = useQuery<ICategories>(GET_ALL_CATEGORIES);

  const { setLocalUser } = useUser();

  const navigate = useNavigate();

  const isError = useMemo(() => {
    return (
      pseudoError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      blogLabelError ||
      descriptionError ||
      categoryError
    );
  }, [
    blogLabelError,
    categoryError,
    confirmPasswordError,
    descriptionError,
    emailError,
    passwordError,
    pseudoError,
  ]);

  const stringRegEx = useMemo(() => {
    return /^[a-zA-Z0-9]{4,}$/;
  }, []);

  const emailRegEx = useMemo(() => {
    // eslint-disable-next-line no-empty-character-class
    return /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])/g;
  }, []);

  const passwordRegEx = useMemo(() => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  }, []);

  const titleAndDescriptionRegEx = useMemo(() => {
    return /^[\p{L}0-9\sçÇ'.,:?!]{4,}$/u;
  }, []);

  const categoryId = useMemo(() => {
    return categories?.getAllCategories.filter((cat) => {
      return cat.label === category;
    })[0].id;
  }, [categories, category]);

  const [signup] = useMutation(SIGN_UP, {
    variables: {
      pseudo,
      email,
      password,
      description,
      blogLabel,
      categoryId,
    },
    onCompleted: (data) => {
      const { signup } = data;
      console.log(data);
      setLocalUser(signup.writer);
      localStorage.setItem('token', signup.token);
      navigate(`/profile/${signup.writer.pseudo}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup();
  };

  const handleMatchRegex = (
    value: string,
    regex: RegExp,
    action: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const check = value.match(regex);
    if (!check) {
      action(true);
    }
  };

  const handleMatchRegexOnChange = (
    value: string,
    regex: RegExp,
    action: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const check = value.match(regex);
    if (check) {
      action(false);
    }
  };

  return (
    <>
      <Title text="Sign up" />

      <div className="w-5/6 p-5 m-auto text-white bg-gray-700 rounded shadow-lg md:w-1/2">
        <form action="" className="flex flex-col gap-y-5" onSubmit={(e) => onSubmit(e)}>
          {/* PSEUDO */}
          <div className="flex gap-x-5">
            <div className="flex">
              <AiOutlineUser className="w-8 h-8 mb-2" />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="pseudo" className="text-xl">
                Pseudo
              </label>
              <input
                onBlur={(e) => handleMatchRegex(e.target.value, stringRegEx, setPseudoError)}
                type="text"
                name="pseudo"
                id="pseudo"
                className={`w-full border rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 text-gray-700 ${
                  pseudoError ? 'border-red-500' : ''
                }`}
                placeholder="Pseudo"
                value={pseudo}
                onChange={(e) => {
                  setPseudo(e.target.value);
                  handleMatchRegexOnChange(e.target.value, stringRegEx, setPseudoError);
                }}
              />
              {pseudoError && (
                <span className="text-red-500">Your pseudo must be at leat 4 characters long</span>
              )}
            </div>
          </div>

          {/* E-MAIL */}
          <div className="flex gap-x-5">
            <div className="flex">
              <AiOutlineMail className="w-8 h-8 mb-2" />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="email" className="text-xl">
                E-mail
              </label>
              <input
                onBlur={(e) => handleMatchRegex(e.target.value, emailRegEx, setEmailError)}
                type="text"
                name="email"
                id="email"
                className={`w-full border rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 text-gray-700 ${
                  emailError ? 'border-red-500' : ''
                }`}
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleMatchRegexOnChange(e.target.value, emailRegEx, setEmailError);
                }}
              />
              {emailError && <span className="text-red-500">The email format is invalid</span>}
            </div>
          </div>

          {/* PASSWORD */}
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
                  onBlur={(e) => handleMatchRegex(e.target.value, passwordRegEx, setPasswordError)}
                  type={isPassword ? 'password' : 'text'}
                  name="password"
                  id="password"
                  className={`w-full border rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 text-gray-700 ${
                    passwordError ? 'border-red-500' : ''
                  }`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleMatchRegexOnChange(e.target.value, passwordRegEx, setPasswordError);
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
              {passwordError && (
                <span className="text-red-500">
                  Password must be at least 8 characters long, contain 1 number and 1 letter
                </span>
              )}
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex gap-x-5">
            <div className="flex">
              <AiOutlineLock className="w-8 h-8" />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="confirm-password" className="text-xl">
                Confirm password
              </label>
              <div className="relative w-full">
                <input
                  onBlur={(e) => {
                    if (e.target.value !== password) setConfirmPasswordError(true);
                  }}
                  type={isPassword ? 'password' : 'text'}
                  name="confirm-password"
                  id="confirm-password"
                  className={`w-full border rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 text-gray-700 ${
                    confirmPasswordError ? 'border-red-500' : ''
                  }`}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (e.target.value === password) setConfirmPasswordError(false);
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
              {confirmPasswordError && (
                <span className="text-red-500">Passwords are different</span>
              )}
            </div>
          </div>

          {/* TITLE */}
          <div className="flex gap-x-5">
            <div className="flex">
              <MdTitle className="w-8 h-8 mb-2" />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="blogLabel" className="text-xl">
                Blog title
              </label>
              <input
                onBlur={(e) =>
                  handleMatchRegex(e.target.value, titleAndDescriptionRegEx, setBlogLabelError)
                }
                type="text"
                name="blogLabel"
                id="blogLabel"
                className={`w-full border rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 text-gray-700 ${
                  blogLabelError ? 'border-red-500' : ''
                }`}
                placeholder="Blog title"
                value={blogLabel}
                onChange={(e) => {
                  setBlogLabel(e.target.value);
                  handleMatchRegexOnChange(
                    e.target.value,
                    titleAndDescriptionRegEx,
                    setBlogLabelError,
                  );
                }}
              />
              {blogLabelError && (
                <span className="text-red-500">Your title must be at leat 10 characters long</span>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex gap-x-5">
            <div className="flex">
              <GiFeather className="w-8 h-8" />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="description" className="text-xl">
                Description
              </label>
              <textarea
                onBlur={(e) =>
                  handleMatchRegex(e.target.value, titleAndDescriptionRegEx, setDescriptionError)
                }
                name="description"
                id="description"
                className={`text-gray-700 w-full border h-36 rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 ${
                  descriptionError ? 'border-red-500' : ''
                }`}
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  handleMatchRegexOnChange(
                    e.target.value,
                    titleAndDescriptionRegEx,
                    setDescriptionError,
                  );
                }}
              />
              {descriptionError && (
                <span className="text-red-500">
                  Your description must be at leat 10 characters long
                </span>
              )}
            </div>
          </div>

          {/* CATEGORY */}
          <div className="flex gap-x-5">
            <div className="flex">
              <BiCategoryAlt className="w-8 h-8" />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="category" className="text-xl">
                Category
              </label>
              <select
                onBlur={(e) => {
                  if (!e.target.value) setCategoryError(true);
                }}
                name="category"
                id="category"
                className={`w-full border rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 text-gray-700 ${
                  categoryError ? 'border-red-500' : ''
                }`}
                onChange={(e) => {
                  setCategory(e.target.value);
                  // console.log(e.target.value);
                  if (e.target.value) setCategoryError(false);
                }}
                value={category}
              >
                <option value="" disabled selected hidden>
                  Select a category
                </option>
                {!loading &&
                  categories?.getAllCategories.map((category) => (
                    <option
                      className="text-gray-700"
                      key={category.id + Math.random()}
                      value={category.label}
                    >
                      {category.label}
                    </option>
                  ))}
              </select>
              {categoryError && <span className="text-red-500">You must chose a category</span>}
              <span className="text-xs italic">You will be able to change it later</span>
            </div>
          </div>

          <input
            type="submit"
            value="Sign up"
            className="text-white bg-blue-500 border-0 rounded cursor-pointer form-input disabled:bg-slate-400 disabled:cursor-not-allowed"
            disabled={isError}
          />
        </form>

        <div className="mt-10">
          <p className="text-right">
            Already signed up?{' '}
            <Link to={'/login'} className="text-blue-500 underline">
              Login here !
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Registration;
