import { AdvResponseData, ErrorMessagesTypes, ServerApiHandler } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { AdvertisementDBModel, HouseDBModel } from "lib/db/shema";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";

// Bundles House, User and Tags.
const get: ServerApiHandler<{}, AdvResponseData> = async (req, res) => {
  const { id } = req.query;

  const data = await AdvertisementDBModel.findById(id)
    .populate({
      path: "house",
      populate: {
        path: "owner",
      },
    })
    .populate("tags");
  if (!data) throw Error(ErrorMessagesTypes.err404);

  res.status(200).json({ success: true, data });
};

// Bundles nothing
const del: ServerApiHandler<{}, AdvResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;

  const data = await AdvertisementDBModel.findById(id);
  if (!data) throw Error(ErrorMessagesTypes.err404);

  const houseOwner = (await HouseDBModel.findById(data.house))!!.owner._id as any;
  if (!houseOwner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  await AdvertisementDBModel.findByIdAndDelete(id);

  res.status(200).json({ success: true, data });
});

export default apiHandleMethods().get(get).delete(del).prepare();
