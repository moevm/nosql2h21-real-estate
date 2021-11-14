import apiHandleMethods from "lib/apiHandleMethods";
import { AdvListResponseData, ErrorMessagesTypes, ServerApiHandler } from "core/types/api";
import { AdvertisementDBModel } from "lib/db/shema";
import getAuthorizedUser from "lib/auth/getAuthorizedUser";

const get: ServerApiHandler<{}, AdvListResponseData> = async (req, res) => {
  const user = await getAuthorizedUser(req);

  const data = await AdvertisementDBModel.find()
    .populate({
      path: "user",
      populate: { path: "owner" },
    })
    .find({ _id: user!!._id })
    .populate("tags");
  if (!data) throw Error(ErrorMessagesTypes.err404);

  res.status(200).json({ success: true, data });
};

export default apiHandleMethods().get(get).prepare();
