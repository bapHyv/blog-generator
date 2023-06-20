import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const ADD_COMMENT = gql`
  mutation Mutation($content: String!, $articleId: Int!) {
    createOneArticleComment(content: $content, articleId: $articleId) {
      id
      content
    }
  }
`;

const AddCommentTab = ({ articleId }: { articleId: number }) => {
  const [comment, setComment] = useState('');
  const [addComment] = useMutation(ADD_COMMENT, { variables: { articleId, content: comment } });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment();
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
      <div className="flex justify-end">
        <input
          type="submit"
          value="Add comment"
          className="p-3 text-white bg-green-500 rounded cursor-pointer"
        />
      </div>
    </form>
  );
};

export default AddCommentTab;
