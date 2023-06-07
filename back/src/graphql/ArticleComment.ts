import { objectType } from "nexus";

export const ArticleComment = objectType({
  name: "ArticleComment",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.boolean("isValidated");
    t.nonNull.string("content");
    t.int("note");

    t.field("publishedBy", {
      type: "Writer",
      resolve: (r, a, c, i) =>
        c.prisma.articleComment
          .findUnique({ where: { id: r.id } })
          .publishedBy(),
    });

    t.field("publishedOn", {
      type: "Article",
      resolve: (r, a, c) =>
        c.prisma.articleComment
          .findUnique({ where: { id: r.id } })
          .publishedOn(),
    });
  },
});
