import React from 'react';

const Title = ({ text }: { text: string }) => {
  return (
    <div className="my-10 text-center">
      <h1 className="pb-2 text-gray-700 uppercase border-b-2 border-gray-700">
        <span className="text-4xl">"{text[0]}</span>
        <span className="text-2xl">{text.substring(1)}</span>
      </h1>
    </div>
  );
};

export default Title;
