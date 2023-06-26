import React, { useMemo, useState } from 'react';
import { IWriter } from '../pages/Writers';
import { Link } from 'react-router-dom';
import {
  AiFillProfile,
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from 'react-icons/ai';
import { useUser } from '../contexts/UserContext';
import { HiInformationCircle } from 'react-icons/hi';
import { gql, useMutation } from '@apollo/client';

const FOLLOW_WRITER = gql`
  mutation Mutation($writerIdToFollow: Int!) {
    followWriter(writerIdToFollow: $writerIdToFollow) {
      id
      following {
        id
        email
        pseudo
      }
    }
  }
`;

const UNFOLLOW_WRITER = gql`
  mutation Mutation($writerIdToStopFollowing: Int!) {
    stopFollowingWriter(writerIdToStopFollowing: $writerIdToStopFollowing) {
      id
      following {
        id
        email
        pseudo
      }
    }
  }
`;

// const GET_FOLLOWING = gql``;

/**
 * Mettre un bouton différent si follow
 * Mettre un bouton différent sur la card du writer connecté
 */

interface followWriter {
  id: number;
  following: following;
}
interface following {
  id: number;
  email: string;
  pseudo: string;
}

interface IData {
  followWriter: followWriter;
}

interface IUnfollowData {
  stopFollowWriter: followWriter;
}

const WriterCard = ({ writer }: { writer: IWriter }) => {
  const [isMsgVisible, setIsMsgVisible] = useState(false);
  const { user, setLocalUser } = useUser();

  const [followWriter] = useMutation<IData>(FOLLOW_WRITER, {
    variables: { writerIdToFollow: writer.id },
    onCompleted: async (data) => {
      setLocalUser((state) => ({
        ...state,
        following: [...state.following, { following: data.followWriter.following }],
      }));
    },
  });

  const [unfollowWriter] = useMutation<IData>(UNFOLLOW_WRITER, {
    variables: { writerIdToStopFollowing: writer.id },
    onCompleted: (data) => {
      const _following = user.following.filter((following) => following.following.id !== writer.id);

      setLocalUser((state) => ({
        ...state,
        following: _following,
      }));
    },
  });

  const following = useMemo(() => {
    if (user.id) {
      return user.following.some((following) => following.following.id === writer.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id ? user.following.length : null]);

  return writer ? (
    <>
      <div className="w-full mx-8 md:w-[32%] lg:mx-auto text-black shadow-card rounded">
        <div className="relative flex flex-col items-center justify-center py-5 transition-all bg-white border-b border-gray-300 rounded-t gap-y-3 hover:bg-gray-50 ">
          <Link className="absolute w-full h-full" to={`/writers/${writer.id}`}></Link>
          <AiOutlineUser className="text-black border border-black rounded-full w-28 h-28" />
          <h2 className="text-center">
            <span className="text-3xl">{writer.pseudo[0].toUpperCase()}</span>
            <span className="text-lg">{writer.pseudo.substring(1)}</span>
          </h2>
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-pink-700 rounded-full bg-pink-50 ring-1 ring-inset ring-pink-600/20">
            {writer.category.label[0].toUpperCase() + writer.category.label.substring(1)}
          </span>
          <p className="px-2 py-1 mt-1 text-xs text-green-700 border rounded-full bg-green-50 border-green-600/20">
            <span>
              {writer.followers.length} follower{writer.followers.length > 1 ? 's' : ''}
            </span>{' '}
            -{' '}
            <span>
              {writer.articles.length} article{writer.articles.length > 1 ? 's' : ''}
            </span>
          </p>
        </div>

        <div className="flex">
          {user.id === writer.id ? (
            <div className="flex items-center justify-center w-1/2 transition-all bg-gray-500 rounded-bl cursor-not-allowed">
              <AiOutlineUser className="p-1 text-white w-9 h-9" />
            </div>
          ) : !following ? (
            <div
              className={`relative flex items-center justify-center w-1/2 transition-all bg-blue-500 rounded-bl hover:bg-blue-600
              ${user.id ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              onPointerEnter={() => setIsMsgVisible(true)}
              onPointerLeave={() => setIsMsgVisible(false)}
              onClick={() => {
                if (user.id) followWriter();
              }}
            >
              <AiOutlineUserAdd className="p-1 text-white w-9 h-9" />
              {isMsgVisible && !user.id && (
                <div className="hidden lg:block absolute z-50 p-4 rounded-md w-[350px] bg-blue-100 border -bottom-12 border-blue-600">
                  <div className="flex">
                    <div>
                      <HiInformationCircle className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        You have to be connected to follow a writer
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex items-center justify-center w-1/2 transition-all bg-red-500 rounded-bl cursor-pointer hover:bg-red-600"
              onClick={() => {
                if (user.id) unfollowWriter();
              }}
            >
              <AiOutlineUserDelete className="p-1 text-white w-9 h-9" />
            </div>
          )}
          <div className="relative flex items-center justify-center w-1/2 transition-all bg-purple-500 rounded-br cursor-pointer hover:bg-purple-600">
            <Link className="absolute w-full h-full" to={`/writers/${writer.id}`}></Link>

            <AiFillProfile className="p-1 text-white w-9 h-9" />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div></div>
  );
};

export default WriterCard;
