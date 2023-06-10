import * as jwt from "jsonwebtoken";

export interface AuthTokenPayload {
  writerId: number;
  writerEmail: string;
  writerRole: string;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token found");
  }

  return jwt.verify(
    token,
    process.env.SECRET_KEY as jwt.Secret
  ) as AuthTokenPayload;
}
