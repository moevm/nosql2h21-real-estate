import { AdvCreateRequestData, AdvRequestData, AdvResponseData, ErrorMessagesTypes, ServerApiHandler } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { AdvertisementDBModel, HouseDBModel, TagDBModel } from "lib/db/shema";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";

// Bundles House, User and Tags.
const get: ServerApiHandler<AdvRequestData, AdvResponseData> = async (req, res) => {
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

// Bundles nothing.
const put: ServerApiHandler<AdvCreateRequestData, AdvResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;
  const data = req.body;

  delete data._id;
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;

  data.tags = await Promise.all(
    data.tags.map(async (tag: string) => {
      const inside = await TagDBModel.findOne({ value: tag });
      if (inside) return inside._id;
      return (await new TagDBModel({ value: tag }).save())._id;
    }),
  );

  const nova = await AdvertisementDBModel.findById(id);
  if (!nova) throw Error(ErrorMessagesTypes.err404);

  const houseOwner = (await HouseDBModel.findById(nova.house))!!.owner._id as any;
  if (!houseOwner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  const result = await AdvertisementDBModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  res.status(200).json({ success: true, data: result });
});

// Bundles nothing.
const del: ServerApiHandler<AdvRequestData, AdvResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;

  const data = await AdvertisementDBModel.findById(id);
  if (!data) throw Error(ErrorMessagesTypes.err404);

  const houseOwner = (await HouseDBModel.findById(data.house))!!.owner._id as any;
  if (!houseOwner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  await AdvertisementDBModel.findByIdAndDelete(id);

  res.status(200).json({ success: true, data });
});

export default apiHandleMethods().get(get).put(put).delete(del).prepare();
