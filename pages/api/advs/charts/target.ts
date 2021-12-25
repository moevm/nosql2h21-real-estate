import { advFiltersToMatch } from "core/helpers/advFiltersToMatch";
import { ServerApiHandler, TargetChartRequestData, TargetChartResponseData } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { AdvertisementDBModel, HouseDBModel, UserDBModel } from "serverSide/db/shema";

const post: ServerApiHandler<TargetChartRequestData, TargetChartResponseData> = async (req, res) => {
  const filters = req.body;
  const matches = advFiltersToMatch(filters);

  const aggRes = (
    await AdvertisementDBModel.aggregate([
      // { $match: (filters.search && { $text: { $search: filters.search } }) || {} },
      { $lookup: { from: "houses", localField: "house", foreignField: "_id", as: "house" } },
      { $set: { house: { $first: "$house" } } },
      { $lookup: { from: UserDBModel.collection.name, localField: "house.owner", foreignField: "_id", as: "house.owner" } },
      { $set: { "house.owner": { $first: "$house.owner" } } },
      { $match: matches },
      {
        // @ts-ignore
        $group: {
          _id: null,
          target0: { $sum: { $cond: [{ $eq: ["$target", 0] }, 1, 0] } },
          target1: { $sum: { $cond: [{ $eq: ["$target", 1] }, 1, 0] } },
        },
      },

      {
        $project: {
          _id: 0,
          0: {
            angle: "$target0",
            color: "#448aff",
            label: { $concat: ["Продажа", "(", { $toString: "$target0" }, ")"] },
            radius: "15",
          },
          q: {
            angle: "$target1",
            color: "#83b9ff",
            label: { $concat: ["Аренда", "(", { $toString: "$target1" }, ")"] },
            radius: "20",
          },
        },
      },
    ])
  )[0];

  res.status(200).json({
    success: true,
    data: Object.values(aggRes),
  });
};

export default apiHandleMethods().post(post).prepare();
