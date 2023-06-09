import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Category = objectType({
  name: "Category",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("label");
    t.list.field("writers", {
      type: "Writer",
      resolve: (r, a, c) =>
        c.prisma.category.findUnique({ where: { id: r.id } }).writers(),
    });
  },
});

export const CategoryQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("getOneCategory", {
      type: "Category",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { id } = a;

        const category = await c.prisma.category.findUnique({
          where: { id },
        });

        return category;
      },
    });

    t.nonNull.list.nonNull.field("getAllCategories", {
      type: "Category",
      resolve: async (r, a, c, i) => {
        const category = await c.prisma.category.findMany();

        return category;
      },
    });
  },
});

export const CategoryMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createOneCategory", {
      type: "Category",
      args: {
        label: nonNull(stringArg()),
      },
      resolve: async (r, a, c, i) => {
        const { label } = a;

        const category = await c.prisma.category.create({
          data: {
            label,
          },
        });

        return category;
      },
    });

    t.nonNull.field("updateOneCategory", {
      type: "Category",
      args: {
        label: nonNull(stringArg()),
      },
      resolve: async (r, a, c, i) => {
        const { label } = a;

        const category = await c.prisma.category.update({
          data: {
            label,
          },
          where: { label },
        });

        return category;
      },
    });

    t.nonNull.field("deleteOneCategory", {
      type: "Category",
      args: {
        label: nonNull(stringArg()),
      },
      resolve: async (r, a, c, i) => {
        const { label } = a;

        const category = await c.prisma.category.delete({
          where: { label },
        });

        return category;
      },
    });
  },
});
