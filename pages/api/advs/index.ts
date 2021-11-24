// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AdvListResponseData, ServerApiHandler } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { AdvertisementDBModel, HouseDBModel, TagDBModel, UserDBModel } from "lib/db/shema";

// Bundles House and Tags
const get: ServerApiHandler<{}, AdvListResponseData> = async (req, res) => {
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
      $lookup: {
        from: TagDBModel.collection.name,
        localField: "tags",
        foreignField: "_id",
        as: "tags",
      },
    },
  ]);

  res.status(200).json({ success: true, data });
};

export default apiHandleMethods().get(get).prepare();
