import { TagDBModel } from "serverSide/db/shema";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { ServerApiHandler, TagListRequestData, TagListResponseData } from "../../../core/types/api";

// Bundles nothing.
const get: ServerApiHandler<TagListRequestData, TagListResponseData> = async (req, res) => {
  const data = await TagDBModel.find();
  res.status(200).json({ success: true, data });
};

export default apiHandleMethods().get(get).prepare();
