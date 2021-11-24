import { ServerApiHandler, ServerApiHandlerWithUser } from "core/types/api";
import getAuthorizedUser from "../auth/getAuthorizedUser";

export default function withAuthorizedUser(handler: ServerApiHandlerWithUser<any, any>): ServerApiHandler<any, any> {
  return async (req, res) => {
    const user = await getAuthorizedUser(req);
    if (user === null) {
      res.status(401).send({
        success: false,
        error: "authentication needed",
      });
    } else await handler(req, res, user);
  };
}
