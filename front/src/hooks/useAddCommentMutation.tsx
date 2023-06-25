import { gql, useMutation } from '@apollo/client';

const ADD_COMMENT_ARTICLE = gql`
  mutation Mutation($content: String!, $articleId: Int!, $note: Int) {
    createOneArticleComment(content: $content, articleId: $articleId, note: $note) {
      id
      content
    }
  }
`;

const ADD_COMMENT_WRITER = gql`
  mutation CreateOneWriterComment($content: String!, $writerIdBeingCommented: Int!, $note: Int) {
    createOneWriterComment(
      content: $content
      writerIdBeingCommented: $writerIdBeingCommented
      note: $note
    ) {
      id
      content
    }
  }
`;

type TypeOfComment = 'article' | 'writer';

const useAddCommentMutation = ({
  id,
  type,
  comment,
  rating,
}: {
  id: number;
  type: TypeOfComment;
  comment: string;
  rating: number | null;
}) => {
  const [addComment, { called, error, data }] = useMutation(
    type === 'article' ? ADD_COMMENT_ARTICLE : ADD_COMMENT_WRITER,
    {
      variables:
        type === 'article'
          ? { articleId: id, content: comment, note: rating }
          : { writerIdBeingCommented: id, content: comment, note: rating },
    },
  );

  return {
    addComment,
    called,
    error,
    data,
  };
};

export default useAddCommentMutation;
