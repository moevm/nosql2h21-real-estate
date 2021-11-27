import { ServerApiHandler, TagListRequestData, TagListResponseData } from "../../../core/types/api";
import { TagDBModel } from "../../../lib/db/shema";
import apiHandleMethods from "../../../lib/apiHandleMethods";

// Bundles nothing.
const get: ServerApiHandler<TagListRequestData, TagListResponseData> = async (req, res) => {
  const data = await TagDBModel.find();
  res.status(200).json({ success: true, data });
};

export default apiHandleMethods().get(get).prepare();
