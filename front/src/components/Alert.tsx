import { Transition } from '@headlessui/react';
import {
  ExclamationTriangleIcon,
  XCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { Fragment, useMemo } from 'react';

type TAlert = 'info' | 'warning' | 'error' | 'valid';

const Alert = ({
  type,
  text,
  isShowing,
  setIsShowing,
}: {
  type: TAlert;
  text: string;
  isShowing: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const icon = useMemo(() => {
    switch (type) {
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-blue-400" aria-hidden="true" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />;
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />;
      case 'valid':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" aria-hidden="true" />;
      default:
        break;
    }
  }, [type]);

  const color = useMemo(() => {
    switch (type) {
      case 'info':
        return 'blue';
      case 'warning':
        return 'yellow';
      case 'error':
        return 'red';
      case 'valid':
        return 'green';
      default:
        break;
    }
  }, [type]);

  return (
    <>
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transition-all duration-200"
        enterFrom="fixed top-2 -right-[1000px] z-[100]"
        enterTo="fixed top-2 right-2 z-[100]"
        leave="transition-opacity duration-200"
        leaveFrom="fixed top-2 right-2 z-[100]"
        leaveTo="fixed top-2 -right-[1000px] z-[100]"
      >
        <div className={`p-4 rounded-md bg-${color}-50 fixed top-2 right-2 shadow-card`}>
          <div className="flex">
            <div className="flex-shrink-0">{icon}</div>
            <div className="ml-3">
              <p className={`text-sm font-medium text-${color}-800`}>{text}</p>
            </div>
            <div className="pl-3 ml-auto">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className={`inline-flex rounded-md bg-${color}-50 p-1.5 text-${color}-500 hover:bg-${color}-100 focus:outline-none focus:ring-2 focus:ring-${color}-600 focus:ring-offset-2 focus:ring-offset-${color}-50`}
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon
                    className="w-5 h-5"
                    aria-hidden="true"
                    onClick={() => setIsShowing(false)}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Alert;
