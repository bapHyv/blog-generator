export interface User {
  id: number;
  blogId: number;
  blogLabel: string;
  pseudo: string;
  email: string;
  description: string;
  avatar: string;
  articles: Article[];
  followers: { followed: { email: string; id: number; pseudo: string } }[];
  following: { following: { email: string; id: number; pseudo: string } }[];
  commentsFromWriters: IComment[];
  commentsOnArticles: IComment[];
  commentsOnWriters: IComment[];
}

export interface Article {
  id: number;
  isPublished: boolean;
  label: string;
  createdAt: string;
  content: string;
  publishedBy: {
    id: number;
    pseudo: string;
    description: string;
  };
  comments: [{ id: number; note: number; isValidated: boolean }];
}

export interface FileImageData {
  base64Data: string;
  width: number;
  height: number;
}

export interface IComment {
  id: number;
  note: number;
  createdAt: string;
  content: string;
  publishedBy: {
    id: number;
    pseudo: string;
    category: {
      label: string;
    };
    articles: {
      id: number;
    }[];
    followers: {
      followed: {
        id: number;
      };
    }[];
  };
  isValidated: boolean;
}
