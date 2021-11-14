import { ServerApiHandler, UserAuthInfoResponse } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";

const get: ServerApiHandler<{}, UserAuthInfoResponse> = withAuthorizedUser(async (req, res, user) => {
  res.status(200).json({
    success: true,
    data: user,
  });
});

export default apiHandleMethods().get(get).prepare();
