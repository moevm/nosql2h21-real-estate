// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AdvListRequestData, AdvListResponseData, ServerApiHandler } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { AdvertisementDBModel, TagDBModel, UserDBModel } from "serverSide/db/shema";

const post: ServerApiHandler<AdvListRequestData, AdvListResponseData> = async (req, res) => {
  const { body } = req;
  // const filters = body.data;
  const page = body.page === undefined ? 0 : body.page;
  const limit = body.limit === undefined ? 10 : body.limit;

  const data = await AdvertisementDBModel.aggregate([
    // TODO: filters parse
    { $match: {} },
    { $skip: limit * page },
    { $limit: limit },
    { $lookup: { from: "houses", localField: "house", foreignField: "_id", as: "house" } },
    { $set: { house: { $first: "$house" } } },
    { $lookup: { from: UserDBModel.collection.name, localField: "house.owner", foreignField: "_id", as: "house.owner" } },
    { $set: { "house.owner": { $first: "$house.owner" } } },
    { $lookup: { from: TagDBModel.collection.name, localField: "tags", foreignField: "_id", as: "tags" } },
  ]);
  const total = await AdvertisementDBModel.count();
  res.status(200).json({
    success: true,
    data: {
      data,
      page: page || 0,
      limit: limit || 0,
      total,
    },
  });
};

export default apiHandleMethods().post(post).prepare();
