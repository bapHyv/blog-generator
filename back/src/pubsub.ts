import { ArticleComment, Follow, WriterComment } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { TypedPubSub } from "typed-graphql-subscriptions";

export type PubSubChannels = {
  newArticleComment: [{ createdArticleComment: ArticleComment }];
  newWriterComment: [{ createdWriterComment: WriterComment }];
  newFollower: [{ newFollower: Follow }];
};

export const pubSub = new TypedPubSub<PubSubChannels>(new PubSub());
