import { ArticleComment, WriterComment } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { TypedPubSub } from "typed-graphql-subscriptions";

export type PubSubChannels = {
  newArticleComment: [{ createdArticleComment: ArticleComment }];
  newWriterComment: [{ createdWriterComment: WriterComment }];
};

export const pubSub = new TypedPubSub<PubSubChannels>(new PubSub());
