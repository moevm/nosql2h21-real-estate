import { ServerApiHandler, TargetChartRequestData, TargetChartResponseData } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { AdvertisementDBModel } from "serverSide/db/shema";

const get: ServerApiHandler<TargetChartRequestData, TargetChartResponseData> = async (req, res) => {
  const aggRes = (
    await AdvertisementDBModel.aggregate([
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
            label: "Продажи",
            radius: "15",
          },
          q: {
            angle: "$target1",
            color: "#83b9ff",
            label: "Аренда",
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

export default apiHandleMethods().get(get).prepare();
