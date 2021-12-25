import { ServerApiHandler, TargetChartRequestData, TargetChartResponseData } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { AdvertisementDBModel, HouseDBModel } from "serverSide/db/shema";

const get: ServerApiHandler<TargetChartRequestData, TargetChartResponseData> = async (req, res) => {
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
      {
        // @ts-ignore
        $group: {
          _id: null,
          p1: { $sum: { $cond: [{ $eq: ["$house.finishing", 0] }, 1, 0] } },
          p2: { $sum: { $cond: [{ $eq: ["$house.finishing", 1] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          0: {
            angle: "$p1",
            color: "#448aff",
            label: "Нормальный",
            radius: 15,
          },
          1: {
            angle: "$p2",
            color: "#83b9ff",
            label: "Плохой",
            radius: 19,
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

export default apiHandleMethods().get(get).prepare();
