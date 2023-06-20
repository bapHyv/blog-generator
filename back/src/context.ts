import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { decodeAuthHeader } from "./utils/auth";
import { pubSub } from "./pubsub";

export const prisma = new PrismaClient();
export interface Context {
  prisma: PrismaClient;
  writerId?: number;
  writerEmail?: string;
  writerRole?: string;
  pubSub: typeof pubSub;
}

export const context = async ({ req }: { req: Request }): Promise<Context> => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    writerId: token?.writerId,
    writerEmail: token?.writerEmail,
    writerRole: token?.writerRole,
    pubSub,
  };
};
