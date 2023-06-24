import React, { useState } from 'react';
import { IWriter } from '../pages/Writers';
import { Link } from 'react-router-dom';
import { AiFillProfile, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { useUser } from '../contexts/UserContext';
import { HiInformationCircle } from 'react-icons/hi';

const WriterCard = ({ writer }: { writer: IWriter }) => {
  const [isMsgVisible, setIsMsgVisible] = useState(false);
  const { user } = useUser();
  return writer ? (
    <>
      <div className="w-full mx-8 md:w-[32%] lg:mx-auto text-black">
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
          <div
            className={`relative flex items-center justify-center w-1/2 transition-all bg-blue-500 rounded-bl hover:bg-blue-600
              ${user.id ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onPointerEnter={() => setIsMsgVisible(true)}
            onPointerLeave={() => setIsMsgVisible(false)}
          >
            <AiOutlineUserAdd className={`w-9 h-9 p-1 text-white`} />
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
          <div className="relative flex items-center justify-center w-1/2 transition-all bg-purple-500 rounded-br cursor-pointer hover:bg-purple-600">
            <Link className="absolute w-full h-full" to={`/writers/${writer.id}`}></Link>

            <AiFillProfile className="p-1 text-white w-9 h-9" />
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col p-2 mt-10 text-white bg-gray-700 md:p-5 rounded-2xl gap-x-5">
        <div className="flex flex-col w-full p-2 rounded gap-y-5" key={writer.id + Math.random()}>
          <div className="relative p-2 transition-all bg-blue-500 rounded lg:hover:bg-blue-600">
            <Link className="absolute w-full h-full" to={`/writers/${writer.id}`}></Link>
            <div className="flex items-center gap-x-2">
              <AiOutlineUser className="w-6 h-6 border border-white rounded-full" />
              <h2>
                <span className="text-3xl">{writer.pseudo[0].toUpperCase()}</span>
                <span className="text-lg">{writer.pseudo.substring(1)}</span>
                <span> - </span>
                <span className="italic">
                  {writer.category.label[0].toUpperCase() + writer.category.label.substring(1)}
                </span>
              </h2>
            </div>

            <div className="h-[1px] bg-white"></div>

            <p className="mt-1 text-sm">
              <span>
                {writer.followers.length} follower{writer.followers.length > 1 ? 's' : ''}
              </span>{' '}
              -{' '}
              <span>
                {writer.articles.length} article{writer.articles.length > 1 ? 's' : ''}
              </span>
            </p>
          </div>
          <div className="p-2">
            <h3 className="underline">Description:</h3>
            <p className="italic">{writer.description} </p>
          </div>
        </div>
        <div className="flex justify-end">
          <div
            className="relative"
            onPointerEnter={() => setIsMsgVisible(true)}
            onPointerLeave={() => setIsMsgVisible(false)}
          >
            <AiOutlineUserAdd
              className={`w-9 h-9 p-1 bg-blue-500 text-white rounded-full border border-white cursor-pointer ${
                user.id ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
            />{' '}
            {isMsgVisible && !user.id && (
              <div className="hidden lg:block absolute p-4 rounded-md w-[350px] -left-[175px] bg-blue-50">
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
        </div>
      </div> */}
    </>
  ) : (
    <div></div>
  );
};

export default WriterCard;
