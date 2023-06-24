import React from 'react';

const Title = ({ text }: { text: string }) => {
  return (
    <div className="my-10 text-3xl text-center">
      <span className="text-gray-700 uppercase border-b-4 border-gray-700 shadow-lg">{text}</span>
    </div>
  );
};

export default Title;
