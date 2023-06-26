import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

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

export const ImageQueries = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAllImages", {
      type: "Image",
      resolve: async (r, a, c, i) => {
        const images = await c.prisma.image.findMany();

        return images;
      },
    });

    t.list.field("getAllImagesFromWriter", {
      type: "Image",
      resolve: async (r, a, c, i) => {
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot get photos without logging in");
        }

        const images = await c.prisma.image.findMany({
          where: { ownerId: writerId },
        });

        return images;
      },
    });

    t.field("getOneImage", {
      type: "Image",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { id } = a;

        const image = await c.prisma.image.findUnique({ where: { id } });

        return image;
      },
    });
  },
});

export const ImageMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addOneImage", {
      type: "Image",
      args: {
        url: nonNull(stringArg()),
      },
      resolve: (r, a, c, i) => {
        const { url } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot add image without logging in");
        }

        const image = c.prisma.image.create({
          data: { url, ownedBy: { connect: { id: writerId } } },
        });

        return image;
      },
    });

    t.nonNull.field("deleteOneImage", {
      type: "Image",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (r, a, c, i) => {
        const { id } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot delete image without logging in");
        }

        const image = c.prisma.image.delete({
          where: { id },
        });

        return image;
      },
    });
  },
});
