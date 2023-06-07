import { objectType } from "nexus";

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
