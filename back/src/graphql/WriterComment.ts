import { objectType } from "nexus";

export const WriterComment = objectType({
  name: "WriterComment",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.boolean("isValidated");
    t.nonNull.string("content");
    t.int("note");

    t.field("writtenBy", {
      type: "Writer",
      resolve: (r, a, c, i) =>
        c.prisma.writerComment.findUnique({ where: { id: r.id } }).writtenBy(),
    });

    t.field("writtenOn", {
      type: "Writer",
      resolve: (r, a, c, i) =>
        c.prisma.writerComment.findUnique({ where: { id: r.id } }).writtenOn(),
    });
  },
});
