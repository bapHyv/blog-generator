import { useApolloClient } from '@apollo/client';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { User } from '../model/models';
import { useSubscribe } from '../contexts/subscribeContext';
import { useMemo } from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AiOutlineUser } from 'react-icons/ai';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function Header() {
  const { user } = useUser();
  const { resetStore } = useApolloClient();
  const { setLocalUser } = useUser();
  const navigate = useNavigate();
  const { acs, utils } = useSubscribe();
  const location = useLocation();

  const navigation = useMemo(() => {
    return [
      { name: 'Articles', href: '/articles' },
      { name: 'Writers', href: '/writers' },
    ];
  }, []);

  const logout = () => {
    resetStore();
    localStorage.removeItem('token');
    setLocalUser({} as User);
    navigate('/');
  };

  const handleClick = () => {
    if (utils.newNotif) {
      utils.setNewNotif(false);
    }
    utils.setComment(undefined);
  };

  return (
    <header>
      <Disclosure as="nav" className="bg-gray-700">
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <div className="flex items-center flex-shrink-0">
                    <Link to={`/`}>
                      <img src="/logo.png" alt="logo" className="h-10 cursor-pointer" />
                    </Link>
                  </div>
                  <div className="hidden sm:items-center sm:flex sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                          aria-current={location.pathname === item.href ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        className="flex p-1 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        disabled={!acs.data}
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="w-6 h-6 text-white" />
                        {utils.newNotif && (
                          <div
                            className="absolute flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full -bottom-1.5 -left-1.5"
                            onClick={() => handleClick()}
                          >
                            1
                          </div>
                        )}
                      </Menu.Button>
                    </div>
                    {acs.data && (
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <div>
                                <p>
                                  New comment on:{' '}
                                  <Link
                                    to={`/articles/${acs.data.newArticleComment.publishedOn.id}`}
                                  >
                                    <span className="text-xl underline">
                                      {acs.data.newArticleComment.publishedOn.label}
                                    </span>
                                  </Link>
                                </p>
                                <p>Comment:</p>
                                <p>{acs.data.newArticleComment.content}</p>
                                <p>
                                  From:{' '}
                                  <Link
                                    to={`/writers/${acs.data.newArticleComment.publishedBy.id}`}
                                  >
                                    <span className="text-xl underline">
                                      {acs.data.newArticleComment.publishedBy.pseudo}
                                    </span>
                                  </Link>
                                </p>
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    )}
                  </Menu>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex p-1 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <AiOutlineUser className="w-6 h-6 text-white" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {user.id ? (
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/profile/${user.pseudo}`}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                                onClick={() => logout()}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      ) : (
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/login`}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                Login
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/registration`}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                Register
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      )}
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}

export default Header;
