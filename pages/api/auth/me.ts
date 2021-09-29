// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "core/models";
import { UserAuthInfoResponse } from "core/types/api";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<UserAuthInfoResponse>, user: User) {
  res.status(200).json({
    success: true,
    data: user,
  });
}
export default withAuthorizedUser(handler);
