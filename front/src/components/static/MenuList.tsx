import { User } from '../../model/models';

const MenuList = ({
  label,
  items,
  isActive,
  isOpen,
  component,
  articleNumber,
  setIsOpen,
  setComponent,
  setArticleNumber,
}: {
  label: string;
  items: User['articles'];
  isActive: boolean;
  isOpen: boolean;
  component: string;
  articleNumber: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setComponent: React.Dispatch<React.SetStateAction<string>>;
  setArticleNumber: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setComponent(component !== 'Articles' ? 'Articles' : '');
        }}
        className="flex items-center h-10 pl-5 cursor-pointer"
      >
        <span>{label}</span>
      </div>
      <div
        className={`top-10 right-0 bg-gray-800 flex flex-col ${isActive ? 'absolute' : 'hidden'}`}
      >
        {items?.map((art, i) => (
          <div
            className={`text-white flex items-center h-7 p-2 pr-10 cursor-pointer ${
              articleNumber === i ? 'bg-gray-900' : ''
            } hover:bg-gray-900`}
            key={art.id}
            onClick={() => setArticleNumber(i)}
          >
            {art.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuList;
