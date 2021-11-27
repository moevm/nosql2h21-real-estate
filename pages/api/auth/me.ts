import { ServerApiHandler, UserAuthInfoResponse } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import withAuthorizedUser from "serverSide/middlewares/withAuthorizedUser";

const get: ServerApiHandler<{}, UserAuthInfoResponse> = withAuthorizedUser(async (req, res, user) => {
  res.status(200).json({
    success: true,
    data: user,
  });
});

export default apiHandleMethods().get(get).prepare();
