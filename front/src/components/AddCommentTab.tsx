import React, { useState } from 'react';
import { typeTab } from '../pages/Article';
import useAddCommentMutation from '../hooks/useAddCommentMutation';
import Alert from './Alert';

type TypeOfComment = 'article' | 'writer';

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
  const [comment, setComment] = useState('');
  const { addComment, error } = useAddCommentMutation({ id, type, comment });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment();
    setIsShowing(true);
    setComment('');
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
