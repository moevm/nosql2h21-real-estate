// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ErrorMessagesTypes, ServerApiHandler, UserResponseData } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { UserDBModel } from "lib/db/shema";

const get: ServerApiHandler<{}, UserResponseData> = async (req, res) => {
  const { id } = req.query;
  const data = await UserDBModel.findById(id);
  if (!data) throw new Error(ErrorMessagesTypes.err404);
  res.status(200).json({ success: true, data });
};

export default apiHandleMethods().get(get).prepare();
