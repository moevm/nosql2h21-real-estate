// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AdvListRequestData, AdvListResponseData, ServerApiHandler } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { AdvertisementDBModel } from "lib/db/shema";

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
    {
      $addFields: {
        house: { $arrayElemAt: ["$house", 0] },
      },
    },
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
