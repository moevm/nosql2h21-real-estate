import { User } from "core/models";
import type { NextApiRequest, NextApiResponse } from "next";
import getAuthorizedUser from "../auth/getAuthorizedUser";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
type HandlerWithUser = (req: NextApiRequest, res: NextApiResponse, user: User) => Promise<void>;

export default function withAuthorizedUser(handler: HandlerWithUser): Handler {
  return async (req, res) => {
    const user = await getAuthorizedUser(req);
    if (user === null) {
      res.status(401).send({
        success: false,
        error: new Error("need auth"),
      });
    } else {
      await handler(req, res, user);
    }
  };
}
