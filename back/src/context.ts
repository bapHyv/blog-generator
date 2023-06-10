import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
import { Request } from "express";
import { decodeAuthHeader } from "./utils/auth";

export interface Context {
  // 1
  prisma: PrismaClient;
  writerId?: number;
  writerEmail?: string;
  writerRole?: string;
}

export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;
  return {
    prisma,
    writerId: token?.writerId,
    writerEmail: token?.writerEmail,
    writerRole: token?.writerRole,
  };
};
