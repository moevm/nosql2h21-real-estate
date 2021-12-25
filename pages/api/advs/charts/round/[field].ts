import { advFiltersToMatch } from "core/helpers/advFiltersToMatch";
import { ServerApiHandler, TargetChartRequestData, TargetChartResponseData } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { AdvertisementDBModel, HouseDBModel } from "serverSide/db/shema";

const post: ServerApiHandler<TargetChartRequestData, TargetChartResponseData> = async (req, res) => {
  const matches = advFiltersToMatch(req.body);
  const { field } = req.query;

  const aggRes = (
    await AdvertisementDBModel.aggregate([
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
      { $match: matches },
      {
        // @ts-ignore
        $group: {
          _id: null,
          p1: { $sum: { $cond: [{ $eq: [`$${field}`, 0] }, 1, 0] } },
          p2: { $sum: { $cond: [{ $eq: [`$${field}`, 1] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          0: {
            angle: "$p1",
            color: "#448aff",
            label: { $concat: ["Нормальный", "(", { $toString: "$p1" }, ")"] },
            radius: "19",
          },
          1: {
            angle: "$p2",
            color: "#83b9ff",
            label: { $concat: ["Плохой", "(", { $toString: "$p2" }, ")"] },
            radius: "15",
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
