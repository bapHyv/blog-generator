import React, { useState } from 'react';
import { typeTab } from '../pages/Article';
import useAddCommentMutation from '../hooks/useAddCommentMutation';
import Alert from './Alert';
import { Rating, ThinStar } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
type TypeOfComment = 'article' | 'writer';

export const customStyle = {
  itemShapes: ThinStar,
  activeFillColor: '#eab308',
  inactiveFillColor: '#d1d5db',
};

const AddCommentTab = ({
  id,
  type,
  setTab,
}: {
  id: number;
  type: TypeOfComment;
  setTab: React.Dispatch<React.SetStateAction<typeTab>>;
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [rating, setRating] = useState<null | number>(null);
  const [comment, setComment] = useState('');
  const { addComment, error } = useAddCommentMutation({ id, type, comment, rating });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(rating, comment);
    addComment();
    setIsShowing(true);
    setComment('');
    setRating(null);
  };

  return (
    <>
      <Alert
        type={error ? 'error' : 'valid'}
        text={
          error
            ? 'An error has occured'
            : 'Your comment has been added successfully, it will be visible when the writer valids it'
        }
        isShowing={isShowing}
        setIsShowing={setIsShowing}
      />
      <form onSubmit={(e) => onSubmit(e)}>
        <textarea
          name="comment"
          id="comment"
          className="w-full h-40 p-5 border rounded border-neutral-700"
          placeholder="Write your comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex items-center gap-x-5">
          <Rating
            style={{ maxWidth: 250 }}
            value={rating ? rating : 0}
            onChange={setRating}
            itemStyles={customStyle}
          />
          <button
            className="px-3 text-white bg-yellow-500 rounded hover:bg-yellow-600"
            onClick={(e) => {
              e.preventDefault();
              setRating(null);
            }}
          >
            RESET
          </button>
        </div>
        <div className="flex justify-end">
          <input
            type="submit"
            value="Add comment"
            className="p-3 text-white bg-green-500 rounded cursor-pointer disabled:bg-slate-400"
            disabled={!comment}
          />
        </div>
      </form>
    </>
  );
};

export default AddCommentTab;
