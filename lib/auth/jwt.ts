import { User } from "core/models";
import crypto from "crypto";

export const generateJWT = (user: User): string => {
  const head = Buffer.from(JSON.stringify({ alg: "HS256", typ: "jwt" })).toString("base64");
  // eslint-disable-next-line no-underscore-dangle
  const body = Buffer.from(JSON.stringify(user._id)).toString("base64");
  const signature = crypto
    .createHmac("SHA256", process.env.JWT_KEY || "1a2b-3c4d-5e6f-7g8h")
    .update(`${head}.${body}`)
    .digest("base64");
  return `${head}.${body}.${signature}`;
};

export const getUserIdByJWT = (token: string): string | null => {
  if (!token) return null;
  const tokenParts = token.split(".");
  const signature = crypto
    .createHmac("SHA256", process.env.JWT_KEY || "1a2b-3c4d-5e6f-7g8h")
    .update(`${tokenParts[0]}.${tokenParts[1]}`)
    .digest("base64");
  if (signature === tokenParts[2]) return JSON.parse(Buffer.from(tokenParts[1], "base64").toString("utf8"));
  return null;
};
