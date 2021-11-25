// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HouseListResponseData, ServerApiHandler } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { HouseDBModel } from "lib/db/shema";

// Bundles nothing.
const get: ServerApiHandler<{}, HouseListResponseData> = async (req, res) => {
  const data = await HouseDBModel.find();
  res.status(200).json({ success: true, data });
};

export default apiHandleMethods().get(get).prepare();
