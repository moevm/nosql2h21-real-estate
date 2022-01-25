import { advFiltersToMatch } from "core/helpers/advFiltersToMatch";
import { ServerApiHandler, TargetChartRequestData, TargetChartResponseData } from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { AdvertisementDBModel, HouseDBModel, UserDBModel } from "serverSide/db/shema";

const CHUNK_LENGTH = 4;
const CHUNKS_COUNT = 10;

const post: ServerApiHandler<TargetChartRequestData, TargetChartResponseData> = async (req, res) => {
  const matches = Object.fromEntries(
    Object.entries(advFiltersToMatch(req.body)).map(([key, value]) => [`advs.${key}`, value]),
  );

  const aggRes = (
    await AdvertisementDBModel.aggregate([
      { $limit: 1 },
      {
        $lookup: {
          from: AdvertisementDBModel.collection.name,
          pipeline: [{ $project: { title: 1, price: 1, house: 1, target: 1 } }],
          as: "advs",
        },
      },
      { $unwind: "$advs" },
      { $lookup: { from: HouseDBModel.collection.name, localField: "advs.house", foreignField: "_id", as: "house" } },
      { $set: { "advs.house": { $first: "$house" } } },
      {
        $lookup: {
          from: UserDBModel.collection.name,
          localField: "advs.house.owner",
          foreignField: "_id",
          as: "advs.house.owner",
        },
      },
      { $set: { "advs.house.owner": { $first: "$advs.house.owner" } } },
      { $match: matches },
      { $group: { _id: "$_id", advs: { $push: "$advs" } } },
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
      { $addFields: { ranges: { $map: { input: { $range: [0, CHUNKS_COUNT, 1] }, as: "adv", in: { idx: "$$adv" } } } } },
      {
        $addFields: {
          advsRanges: {
            $map: {
              input: { $range: [{ $toInt: "$minPrice" }, { $toInt: "$maxPrice" }, { $toInt: "$priceStep" }] },
              as: "price",
              in: {
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
                $mergeObjects: [
                  { x: { $trunc: [{ $multiply: [{ $avg: "$$adv.prices" }, 1 / 1000] }, 1] } },
                  { y: { $size: "$$adv.prices" } },
                ],
              },
            },
          },
        },
      },
      { $unwind: "$parsed" },
      { $sort: { "parsed.avg": 1 } },

      { $group: { _id: "$_id", parsed: { $push: "$parsed" } } },
    ])
  )[0];

  res.status(200).json({
    success: true,
    data: aggRes?.parsed,
  });
};

export default apiHandleMethods().post(post).prepare();
