// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerApiHandler, UserListResponseData } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { UserDBModel } from "serverSide/db/shema";

const get: ServerApiHandler<{}, UserListResponseData> = async (req, res) => {
  const data = await UserDBModel.find();
  res.status(200).json({ success: true, data });
};

export default apiHandleMethods().get(get).prepare();
