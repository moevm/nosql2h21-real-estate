import apiHandleMethods from "lib/apiHandleMethods";
import { AdvListResponseData, ErrorMessagesTypes, LoggedInRequestData, ServerApiHandler } from "core/types/api";
import { AdvertisementDBModel, HouseDBModel, TagDBModel, UserDBModel } from "lib/db/shema";
import withAuthorizedUser from "../../../lib/middlewares/withAuthorizedUser";

// Bundles House and Tags.
const get: ServerApiHandler<LoggedInRequestData, AdvListResponseData> = withAuthorizedUser(async (req, res, user) => {
  const data = await AdvertisementDBModel.aggregate([
    {
      $lookup: {
        from: HouseDBModel.collection.name,
        localField: "house",
        foreignField: "_id",
        as: "house",
      },
    },
    {
      $set: {
        house: { $first: "$house" },
      },
    },
    {
      $lookup: {
        from: UserDBModel.collection.name,
        localField: "house.owner",
        foreignField: "_id",
        as: "house.owner",
      },
    },
    {
      $set: {
        "house.owner": { $first: "$house.owner" },
      },
    },
    {
      $match: {
        "house.owner._id": user._id,
      },
    },
    {
      $set: {
        "house.owner": user._id,
      },
    },
    {
      $lookup: {
        from: TagDBModel.collection.name,
        localField: "tags",
        foreignField: "_id",
        as: "tags",
      },
    },
  ]);
  if (!data) throw Error(ErrorMessagesTypes.err404);

  res.status(200).json({ success: true, data });
});

export default apiHandleMethods().get(get).prepare();
