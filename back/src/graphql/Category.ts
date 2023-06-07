import { objectType } from "nexus";

export const Category = objectType({
  name: "Category",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("label");
    t.list.nonNull.field("writers", {
      type: "Writer",
      resolve: (r, a, c) =>
        c.prisma.category.findUnique({ where: { id: r.id } }).writers(),
    });
  },
});
