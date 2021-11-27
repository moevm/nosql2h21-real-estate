// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HouseListRequestData, HouseListResponseData, ServerApiHandler } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { HouseDBModel } from "serverSide/db/shema";

const post: ServerApiHandler<HouseListRequestData, HouseListResponseData> = async (req, res) => {
  const { body } = req;
  // const filters = body.data;
  const page = body.page === undefined ? 0 : body.page;
  const limit = body.limit === undefined ? 10 : body.limit;

  const data = await HouseDBModel.aggregate([
    // TODO: filters parse
    { $match: {} },
    { $skip: limit * page },
    { $limit: limit },
    { $lookup: { from: "users", localField: "owner", foreignField: "_id", as: "owner" } },
    { $lookup: { from: "advertisements", localField: "_id", foreignField: "house", as: "advertisements" } },
    {
      $addFields: {
        owner: { $arrayElemAt: ["$owner", 0] },
      },
    },
  ]);
  const total = await HouseDBModel.count();
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
