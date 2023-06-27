import { Link } from 'react-router-dom';
const MenuItemLink = ({ label }: { label: string }) => {
  return (
    <Link
      to="/article-builder"
      className={`h-10 pl-5 flex items-center cursor-pointer hover:bg-gray-800`}
    >
      <span>{label}</span>
    </Link>
  );
};

export default MenuItemLink;
