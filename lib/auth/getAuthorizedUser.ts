import { User } from "core/models";
import dbConnect from "lib/db/dbConnect";
import { parse as cookieParse } from "cookie";
import { UserDBModel } from "lib/db/shema";
import type { NextApiRequest } from "next";
import { getUserIdByJWT } from "./jwt";

export default async function getAuthorizedUser(req: NextApiRequest): Promise<User | null> {
  const cookie = cookieParse(req.headers.cookie || "");
  // eslint-disable-next-line no-debugger
  debugger;
  const { accessToken } = cookie;
  const userId = getUserIdByJWT(accessToken);
  if (userId === null) return null;
  await dbConnect();
  return UserDBModel.findById(userId);
}
