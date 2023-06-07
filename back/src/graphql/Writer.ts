import { objectType } from "nexus";

export const Writer = objectType({
  name: "Writer",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("role");
    t.nonNull.string("pseudo");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("description");
    t.nonNull.string("avatar");
    t.nonNull.dateTime("createdAt");
    t.nonNull.string("blogLabel");

    t.field("category", {
      type: "Category",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).category(),
    });

    t.list.nonNull.field("articles", {
      type: "Article",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).articles(),
    });

    t.list.nonNull.field("images", {
      type: "Image",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).images(),
    });

    t.list.nonNull.field("commentsOnArticles", {
      type: "ArticleComment",
      resolve: (r, a, c) =>
        c.prisma.writer
          .findUnique({ where: { id: r.id } })
          .commentsOnArticles(),
    });

    t.list.nonNull.field("commentsOnWriters", {
      type: "ArticleComment",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).commentsOnWriters(),
    });

    t.list.nonNull.field("commentsFromWriters", {
      type: "ArticleComment",
      resolve: (r, a, c) =>
        c.prisma.writer
          .findUnique({ where: { id: r.id } })
          .commentsFromWriters(),
    });

    t.list.nonNull.field("following", {
      type: "Follow",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).following(),
    });

    t.list.nonNull.field("followers", {
      type: "Follow",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).followers(),
    });
  },
});
