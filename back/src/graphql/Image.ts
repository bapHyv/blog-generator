import { objectType } from "nexus";

export const Image = objectType({
  name: "Image",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.string("url");

    t.field("ownedBy", {
      type: "Writer",
      resolve: (r, a, c, i) =>
        c.prisma.image.findUnique({ where: { id: r.id } }).ownedBy(),
    });
  },
});
