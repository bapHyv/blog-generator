import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { decodeAuthHeader } from "../utils/auth";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.string("token");
    t.nonNull.field("writer", {
      type: "Writer",
    });
  },
});

export const AuthQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("autoLogin", {
      type: "Writer",
      args: {
        token: nonNull(stringArg()),
      },
      resolve: async (r, a, c, i) => {
        const { token } = a;

        if (!token) {
          return null;
        }

        const writerData = decodeAuthHeader(token);

        const writer = await c.prisma.writer.findUnique({
          where: { id: writerData.writerId },
        });

        return writer;
      },
    });
  },
});

export const AuthMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("signup", {
      type: "AuthPayload",
      args: {
        pseudo: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        description: nonNull(stringArg()),
        blogLabel: nonNull(stringArg()),
        categoryId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { pseudo, email, password, description, blogLabel, categoryId } =
          a;

        const role = "writer";

        const hasedPassword = await bcrypt.hash(password, 10);

        const writer = await c.prisma.writer.create({
          data: {
            avatar: "/user_icon.png",
            blogLabel,
            categoryId,
            description,
            email,
            password: hasedPassword,
            pseudo,
            role,
          },
        });

        const token = jwt.sign(
          {
            writerId: writer.id,
            writerRole: writer.role,
            writerEmail: writer.email,
          },
          process.env.SECRET_KEY as jwt.Secret
        );

        return {
          token,
          writer,
        };
      },
    });

    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(r, a, c) {
        const { email, password } = a;

        const writer = await c.prisma.writer.findUnique({
          where: { email },
        });

        if (!writer) {
          throw new Error(
            "The writer either does not exist or the password is wrong"
          );
        }

        const valid = await bcrypt.compare(password, writer.password);

        if (!valid) {
          throw new Error(
            "The writer either does not exist or the password is wrong"
          );
        }

        const token = jwt.sign(
          {
            writerId: writer.id,
            writerEmail: writer.email,
            writerRole: writer.role,
          },
          process.env.SECRET_KEY as jwt.Secret
        );

        return {
          token,
          writer,
        };
      },
    });

    t.nonNull.field("passwordLost", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (r, a, c, i) => {
        const { password, email } = a;

        const writer = await c.prisma.writer.findUnique({
          where: { email },
        });

        if (!writer) {
          throw new Error("No such writer found");
        }

        const hasedPassword = await bcrypt.hash(password, 10);

        const updatedWriter = await c.prisma.writer.update({
          data: {
            password: hasedPassword,
          },
          where: { email },
        });

        const token = jwt.sign(
          {
            writerId: updatedWriter.id,
            writerRole: updatedWriter.role,
            writerEmail: updatedWriter.email,
          },
          process.env.SECRET_KEY as jwt.Secret
        );

        return {
          token,
          writer,
        };
      },
    });
  },
});
