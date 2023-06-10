import { extendType, intArg, nonNull, objectType } from "nexus";

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

        const follow = await c.prisma.follow.create({
          data: {
            following: { connect: { id: writerIdToFollow } },
            followed: { connect: { id: writerId } },
          },
        });

        return follow;
      },
    });
  },
});
