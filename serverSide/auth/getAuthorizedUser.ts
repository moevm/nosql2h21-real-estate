import { User } from "core/models";

import { parse as cookieParse } from "cookie";
import { UserDBModel } from "serverSide/db/shema";
import type { NextApiRequest } from "next";
import { getUserIdByJWT } from "./jwt";

export default async function getAuthorizedUser(req: NextApiRequest): Promise<User | null> {
  const cookie = cookieParse(req.headers.cookie || "");
  // eslint-disable-next-line no-debugger
  debugger;
  const { accessToken } = cookie;
  const userId = getUserIdByJWT(accessToken);
  if (userId === null) return null;
  return UserDBModel.findById(userId).select("+password");
}
