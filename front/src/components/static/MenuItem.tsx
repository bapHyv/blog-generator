const MenuItem = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center h-10 pl-5 cursor-pointer hover:bg-gray-800">
      <span>{label}</span>
    </div>
  );
};

export default MenuItem;
