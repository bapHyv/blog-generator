import { useMemo, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import Dashboard from './Dashboard';
import PhotosManager from './PhotosManager';
import ProfileManager from './ProfileManager';
import MenuItem from './static/MenuItem';
import MenuItemLink from './static/MenuItemLink';
import UserArticlePage from './UserArticlePage';
import {} from 'react-icons';
import { MdOutlineInsertPhoto, MdOutlineSpaceDashboard } from 'react-icons/md';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { GiFeather } from 'react-icons/gi';
import { AiOutlineComment } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import UserComments from './UserComments';

export const Userprofile = () => {
  const { user } = useUser();
  const [component, setComponent] = useState('Dashboard');

  const selectedComponent = useMemo(() => {
    switch (component) {
      case 'Dashboard':
        return <Dashboard />;
      case 'PhotosManager':
        return <PhotosManager />;
      case 'ProfileManager':
        return <ProfileManager />;
      case 'Articles':
        return <UserArticlePage articles={user.articles} />;
      case 'Comments':
        return <UserComments />;
      default:
        return <Dashboard />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);

  return (
    <>
      <div className="flex min-h-[70vh]">
        {/* Dashboard menu */}
        <div className="relative w-[250px] min-h-screen bg-gray-700 text-white">
          <div
            onClick={() => setComponent('Dashboard')}
            className={`flex items-center cursor-pointer hover:bg-gray-800 pl-2 ${
              component === 'Dashboard' ? 'bg-gray-800' : ''
            }`}
          >
            <MdOutlineSpaceDashboard className="w-6 h-6" />
            <MenuItem label="Dashboard" />
          </div>
          <div
            onClick={() => setComponent('PhotosManager')}
            className={`flex items-center cursor-pointer hover:bg-gray-800 pl-2 ${
              component === 'PhotosManager' ? 'bg-gray-800' : ''
            }`}
          >
            <MdOutlineInsertPhoto className="w-6 h-6" />
            <MenuItem label="Photos Manager" />
          </div>
          <div className="flex items-center pl-2 cursor-pointer hover:bg-gray-800">
            <GiFeather className="w-6 h-6" />
            <MenuItemLink label="New article" />
          </div>
          <div
            onClick={() => setComponent('Articles')}
            className={`relative flex items-center cursor-pointer hover:bg-gray-800 pl-2 ${
              component === 'Articles' ? 'bg-gray-800' : ''
            }`}
          >
            <HiOutlineNewspaper className="w-6 h-6" />
            <MenuItem label="Articles" />
          </div>
          <div
            onClick={() => setComponent('Comments')}
            className={`flex items-center cursor-pointer hover:bg-gray-800 pl-2 ${
              component === 'Comments' ? 'bg-gray-800' : ''
            }`}
          >
            <AiOutlineComment className="w-6 h-6" />
            <MenuItem label="Comments" />
          </div>
          <div
            onClick={() => setComponent('Friends')}
            className={`flex items-center cursor-pointer hover:bg-gray-800 pl-2 ${
              component === 'Friends' ? 'bg-gray-800' : ''
            }`}
          >
            <BsFillPeopleFill className="w-6 h-6" />
            <MenuItem label="Friends" />
          </div>
        </div>
        {/* Right screen */}
        <div className="flex flex-col w-full p-5">{selectedComponent}</div>
      </div>
    </>
  );
};
