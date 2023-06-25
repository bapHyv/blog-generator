import { withFilter } from "graphql-subscriptions";
import { extendType, intArg, nonNull, objectType } from "nexus";
import { PubSubChannels } from "../pubsub";

export const Follow = objectType({
  name: "Follow",
  definition(t) {
    t.nonNull.int("id");

    t.field("following", {
      type: "Writer",
      resolve: (r, a, c) =>
        c.prisma.follow.findUnique({ where: { id: r.id } }).following(),
    });

    t.field("followed", {
      type: "Writer",
      resolve: (r, a, c) =>
        c.prisma.follow.findUnique({ where: { id: r.id } }).followed(),
    });
  },
});

export const FollowQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getAllFollow", {
      type: "Follow",
      resolve: (r, a, c, i) => c.prisma.follow.findMany(),
    });
  },
});

export const FollowMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("followWriter", {
      type: "Follow",
      args: {
        writerIdToFollow: nonNull(intArg()),
      },
      resolve: async (t, a, c, i) => {
        const { writerIdToFollow } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot follow without logging in");
        }

        if (writerId === writerIdToFollow) {
          throw new Error("You cannot follow yourself !!!");
        }

        const isAlreadyFollowed = await c.prisma.follow.findFirst({
          where: { followingId: writerIdToFollow, followedId: writerId },
        });

        if (isAlreadyFollowed) {
          throw new Error("Cannot follow a user you're already following");
        }

        const follow = await c.prisma.follow.create({
          data: {
            following: { connect: { id: writerIdToFollow } },
            followed: { connect: { id: writerId } },
          },
        });

        c.pubSub.publish("newFollower", {
          newFollower: follow,
        });

        return follow;
      },
    });

    t.nonNull.field("stopFollowingWriter", {
      type: "Follow",
      args: {
        writerIdToStopFollowing: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { writerIdToStopFollowing } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot stop following without logging in");
        }

        const relation = await c.prisma.follow.findFirst({
          where: { followingId: writerIdToStopFollowing, followedId: writerId },
        });

        if (!relation) {
          throw new Error("Cannot stop following a user you're not following");
        }

        const follow = await c.prisma.follow.delete({
          where: { id: relation.id },
        });

        return follow;
      },
    });

    t.nonNull.field("deleteRelation", {
      type: "Follow",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { id } = a;

        const follow = await c.prisma.follow.delete({
          where: { id: id },
        });

        return follow;
      },
    });
  },
});

export const FollowSubscriptions = extendType({
  type: "Subscription",
  definition(t) {
    t.field("newFollower", {
      type: "Follow",
      subscribe: withFilter(
        (r, a, c, i) => {
          return c.pubSub.asyncIterator("newFollower");
        },
        async (p, v, c, i) => {
          return p.newFollower.followingId === c.writerId;
        }
      ),
      resolve: (p: PubSubChannels["newFollower"][0]) => p.newFollower,
    });
  },
});
