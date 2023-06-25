import { gql, useMutation } from '@apollo/client';

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

const useAddCommentMutation = ({
  id,
  type,
  comment,
}: {
  id: number;
  type: TypeOfComment;
  comment: string;
}) => {
  const [addComment, { called, error, data }] = useMutation(
    type === 'article' ? ADD_COMMENT_ARTICLE : ADD_COMMENT_WRITER,
    {
      variables:
        type === 'article'
          ? { articleId: id, content: comment }
          : { writerIdBeingCommented: id, content: comment },
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
