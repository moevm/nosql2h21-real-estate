// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HouseResponseData, ErrorMessagesTypes, ServerApiHandler } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { HouseDBModel } from "serverSide/db/shema";

const get: ServerApiHandler<{}, HouseResponseData> = async (req, res) => {
  const { id } = req.query;
  const data = await HouseDBModel.findById(id).populate("owner");
  if (!data) throw new Error(ErrorMessagesTypes.err404);
  res.status(200).json({ success: true, data });
};

export default apiHandleMethods().get(get).prepare();
