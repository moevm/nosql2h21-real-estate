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
    } else {
      const objUser = (user as any).toObject();
      delete objUser.password;
      await handler(req, res, objUser);
    }
  };
}
