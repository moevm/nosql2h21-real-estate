import { ServerApiHandler, TargetChartRequestData, TargetChartResponseData } from "core/types/api";
import { Db } from "mongodb";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { AdvertisementDBModel } from "serverSide/db/shema";

const CHUNK_LENGTH = 4;
const CHUNKS_COUNT = 10;

const get: ServerApiHandler<TargetChartRequestData, TargetChartResponseData> = async (req, res) => {
  const aggRes = (
    await AdvertisementDBModel.aggregate([
      { $limit: 1 },
      {
        $lookup: {
          from: AdvertisementDBModel.collection.name,
          pipeline: [
            {
              $project: {
                _id: 0,
                price: 1,
              },
            },
          ],
          as: "advs",
        },
      },

      {
        $addFields: {
          maxPrice: { $max: "$advs.price" },
          minPrice: { $min: "$advs.price" },
          priceStep: { $subtract: ["$maxPrice", "$minPrice"] },
        },
      },
      {
        $project: {
          _id: 0,
          advs: 1,
          maxPrice: 1,
          minPrice: 1,
          priceStep: { $multiply: [{ $subtract: ["$maxPrice", "$minPrice"] }, 1 / CHUNKS_COUNT] },
        },
      },
      {
        $addFields: {
          ranges: {
            $map: {
              input: { $range: [0, CHUNKS_COUNT, 1] },
              as: "adv",
              in: {
                idx: "$$adv",
              },
            },
          },
        },
      },
      {
        $addFields: {
          advsRanges: {
            $map: {
              input: { $range: [{ $toInt: "$minPrice" }, { $toInt: "$maxPrice" }, { $toInt: "$priceStep" }] },
              as: "price",
              in: {
                // price: ["$price", 1],
                $mergeObjects: [
                  { neavg: { $sum: [{ $multiply: ["$priceStep", 0.5] }, "$$price"] } },
                  {
                    prices: {
                      $filter: {
                        input: "$advs.price",
                        as: "advPrice",
                        cond: {
                          $and: [
                            { $gte: ["$$advPrice", "$$price"] },
                            { $lt: ["$$advPrice", { $sum: ["$priceStep", "$$price"] }] },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          parsed: {
            $map: {
              input: "$advsRanges",
              as: "adv",
              in: {
                $mergeObjects: [{ avg: { $toInt: { $avg: "$$adv.prices" } } }, { count: { $size: "$$adv.prices" } }],
              },
            },
          },
        },
      },
      { $unwind: "$parsed" },
      { $sort: { "parsed.avg": 1 } },
      // @ts-ignore
      { $group: { _id: "$_id", parsed: { $push: "$parsed" } } },
    ])
  )[0];

  res.status(200).json({
    success: true,
    data: aggRes?.parsed,
  });
};

export default apiHandleMethods().get(get).prepare();
