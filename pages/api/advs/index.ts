// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AdvListResponseData, ServerApiHandler } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { AdvertisementDBModel } from "lib/db/shema";

const get: ServerApiHandler<{}, AdvListResponseData> = async (req, res) => {
  const data = await AdvertisementDBModel.find()
    .populate("tags")
    .populate({
      path: "house",
      populate: {
        path: "owner",
      },
    });

  res.status(200).json({ success: true, data });
};

export default apiHandleMethods().get(get).prepare();
