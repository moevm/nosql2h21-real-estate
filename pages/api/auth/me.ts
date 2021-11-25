import { LoggedInRequestData, ServerApiHandler, UserResponseData } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";

const get: ServerApiHandler<LoggedInRequestData, UserResponseData> = withAuthorizedUser(async (req, res, user) => {
  res.status(200).json({ success: true, data: user });
});

export default apiHandleMethods().get(get).prepare();
