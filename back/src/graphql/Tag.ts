import { objectType } from "nexus";

export const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("label");

    t.list.nonNull.field("articles", {
      type: "Article",
      resolve: (r, a, c) =>
        c.prisma.tag.findUnique({ where: { id: r.id } }).articles(),
    });
  },
});
