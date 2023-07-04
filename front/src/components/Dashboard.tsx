import { useEffect, useMemo, useState } from 'react';
import Title from './static/Title';
import { useUser } from '../contexts/UserContext';
import { gql, useMutation } from '@apollo/client';

const UPDATE_WRITER_MUTATION = gql`
  mutation Mutation($pseudo: String!, $description: String!, $blogLabel: String!) {
    updateWriter(pseudo: $pseudo, description: $description, blogLabel: $blogLabel) {
      id
      pseudo
      role
      email
      description
      createdAt
      blogLabel
      avatar
      category {
        id
        label
      }
      followers {
        followed {
          id
          email
          pseudo
        }
      }
      following {
        following {
          id
          email
          pseudo
        }
      }
    }
  }
`;

const UPDATE_WRITER_AVATAR = gql`
  mutation Mutation($url: String!) {
    updateWriterAvatar(url: $url) {
      avatar
    }
  }
`;

const Dashboard = () => {
  const cloudName = 'dr0zu0121';
  const uploadPreset = 'blogGenerator';
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: 'dr0zu0121',
  //   },
  // });

  const { user, setLocalUser, loading, avatar } = useUser();

  const [pseudo, setPseudo] = useState(user.pseudo);
  const [pseudoError, setPseudoError] = useState(false);

  const [blogLabel, setBlogLabel] = useState(user.blogLabel);
  const [blogLabelError, setBlogLabelError] = useState(false);

  const [description, setDescription] = useState(user.description);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    if (user) {
      setPseudo(user.pseudo);
      setDescription(user.description);
      setBlogLabel(user.blogLabel);
    }
  }, [user]);

  const [updateWriter] = useMutation(UPDATE_WRITER_MUTATION, {
    variables: {
      pseudo,
      description,
      blogLabel,
    },
    onCompleted: (data) => setLocalUser(data.updateWriter),
  });

  const [updateAvatar] = useMutation(UPDATE_WRITER_AVATAR);

  // const avatar = useMemo(() => {
  //   if (user.avatar) {
  //     const cldImg = cld.image(user.avatar);
  //     cldImg.resize(fill().height(150));
  //     return <AdvancedImage cldImg={cldImg} />;
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user.avatar]);

  const uploadWidget = window.cloudinary.createUploadWidget(
    {
      cloudName,
      uploadPreset,
    },
    async (error: Error, result: any) => {
      if (!error && result && result.event === 'success') {
        await updateAvatar({
          variables: {
            url: result.info.public_id,
          },
        });

        setLocalUser((state) => ({ ...state, avatar: result.info.public_id }));
      }
    },
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWriter();
  };

  const titleAndDescriptionRegEx = useMemo(() => {
    return /^[\p{L}0-9\sçÇ'.,:?!]{4,}$/u;
  }, []);

  const stringRegEx = useMemo(() => {
    return /^[a-zA-Z0-9]{4,}$/;
  }, []);

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

  return loading ? (
    <div></div>
  ) : (
    <div>
      <Title text={user.blogLabel} />
      <div className="flex flex-col w-full h-full gap-y-10">
        <h2 className="text-3xl">Profile</h2>
        <form action="" className="flex flex-col gap-y-10" onSubmit={(e) => onSubmit(e)}>
          {/* PSEUDO */}
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="pseudo" className="text-xl">
              Pseudo
            </label>
            <input
              onBlur={(e) => handleMatchRegex(e.target.value, stringRegEx, setPseudoError)}
              type="text"
              name="pseudo"
              id="pseudo"
              className={`w-full border rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 ${
                pseudoError ? 'border-red-500' : ''
              }`}
              placeholder="E-mail"
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

          {/* BLOG LABEL */}
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="blogLabel" className="text-xl">
              Blog Title
            </label>
            <input
              onBlur={(e) =>
                handleMatchRegex(e.target.value, titleAndDescriptionRegEx, setBlogLabelError)
              }
              type="text"
              name="blogLabel"
              id="blogLabel"
              className={`w-full border rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 ${
                blogLabelError ? 'border-red-500' : ''
              }`}
              placeholder="E-mail"
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
              className={` w-full border h-36 rounded form-input focus:ring-blue-500 focus:ring-1 focus:border-blue-500 ${
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
          <div className="flex justify-end">
            <input
              type="submit"
              value="Update profile"
              className="text-white transition-all bg-blue-500 border-0 rounded cursor-pointer hover:bg-blue-600 form-input disabled:bg-slate-400 disabled:cursor-not-allowed"
            />
          </div>
        </form>

        <h2 className="text-3xl">Avatar</h2>

        {/* AVATAR */}
        <div className="flex items-center justify-between">
          {avatar}

          {/* CHANGE PROFILE BUTTON */}
          <button
            className="p-2 my-5 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => uploadWidget.open()}
          >
            Update avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
