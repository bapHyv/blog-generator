import { objectType, extendType } from "nexus";

export const Article = objectType({
  name: "Article",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("label");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
    t.nonNull.string("content");
    t.nonNull.boolean("isPublished");

    t.field("publishedBy", {
      type: "Writer",
      resolve: (r, a, c, i) =>
        c.prisma.article.findUnique({ where: { id: r.id } }).publishedBy(),
    });

    t.list.nonNull.field("comments", {
      type: "ArticleComment",
      resolve: (r, a, c) =>
        c.prisma.article.findUnique({ where: { id: r.id } }).comments(),
    });

    t.list.nonNull.field("tags", {
      type: "Tag",
      resolve: (r, a, c) =>
        c.prisma.article.findUnique({ where: { id: r.id } }).tags(),
    });
  },
});

export const ArticleQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getAllArticles", {
      type: "Article",
      resolve(r, a, c, i) {
        return c.prisma.article.findMany();
      },
    });
  },
});

// export const ArticleMutations = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.nonNull.field("createOneArticle", {
//       type: "Article",
//       args: {
//         label: nonNull(stringArg()),
//         content: nonNull(stringArg()),
//         isPublished: nonNull(booleanArg()),
//       },
//       resolve: (r, a, c, i) => {
//         const { label, content, isPublished } = a;

//         const now = new Date();

//         const newArticle = c.prisma.article.create({
//           data: {
//             label,
//             createdAt: now,
//             updatedAt: now,
//             publishedAt: isPublished ? now : "",
//             content,
//             isPublished,
//           },
//         });

//         return newArticle;
//       },
//     });
//   },
// });
