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
}

export interface Article {
  content: string;
  createdAt: number;
  id: number;
  isPublished: boolean;
  label: string;
  publishedAt?: number | null;
  updatedAt?: number | null;
}

export interface FileImageData {
  base64Data: string;
  width: number;
  height: number;
}
