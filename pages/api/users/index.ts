import { ServerApiHandler, UserListRequestData, UserListResponseData } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { UserDBModel } from "serverSide/db/shema";

// Bundles nothing.
const get: ServerApiHandler<UserListRequestData, UserListResponseData> = async (req, res) => {
  // const filters = body.data;
  const { body } = req;
  const page = body.page === undefined ? 0 : body.page;
  const limit = body.limit === undefined ? 10 : body.limit;

  const data = await UserDBModel.find();
  const total = await UserDBModel.count();
  res.status(200).json({
    success: true,
    data: {
      data,
      page: page || 0,
      limit: limit || 0,
      total,
    },
  });
};

export default apiHandleMethods().get(get).prepare();
