import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { typeTab } from '../pages/Article';

const ADD_COMMENT_ARTICLE = gql`
  mutation Mutation($content: String!, $articleId: Int!) {
    createOneArticleComment(content: $content, articleId: $articleId) {
      id
      content
    }
  }
`;

const ADD_COMMENT_WRITER = gql`
  mutation Mutation($content: String!, $writerIdBeingCommented: Int!) {
    createOneWriterComment(content: $content, writerIdBeingCommented: $writerIdBeingCommented) {
      content
      id
    }
  }
`;

type TypeOfComment = 'article' | 'writer';

const AddCommentTab = ({
  id,
  type,
  refetch,
  setTab,
}: {
  id: number;
  type: TypeOfComment;
  refetch: () => void;
  setTab: React.Dispatch<React.SetStateAction<typeTab>>;
}) => {
  const [comment, setComment] = useState('');
  const [addComment, { called }] = useMutation(
    type === 'article' ? ADD_COMMENT_ARTICLE : ADD_COMMENT_WRITER,
    {
      variables:
        type === 'article'
          ? { articleId: id, content: comment }
          : { writerIdBeingCommented: id, content: comment },
    },
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment();
    setComment('');
    refetch();
    setTab('comments');
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <textarea
        name="comment"
        id="comment"
        className="w-full h-40 p-5 border rounded border-neutral-700"
        placeholder="Write your comment here"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      {called && <p className="text-green-500">Your comment has been added successfully</p>}
      <div className="flex justify-end">
        <input
          type="submit"
          value="Add comment"
          className="p-3 text-white bg-green-500 rounded cursor-pointer"
          disabled={called}
        />
      </div>
    </form>
  );
};

export default AddCommentTab;
