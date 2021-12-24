// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Advertisement } from "core/models";
import {
  AdvListFilters,
  AdvListRequestData,
  AdvListResponseData,
  PaginatedAgregateResponse,
  ServerApiHandler,
} from "core/types/api";
import apiHandleMethods from "serverSide/apiHandleMethods";
import { AdvertisementDBModel, TagDBModel, UserDBModel } from "serverSide/db/shema";

type Matches = {
  title?: any;
  target?: any;
  "house.finishing"?: any;
  price?: any; // ok
  size?: any; // ok
  countBathrooms?: any; // ok
  "house.rating"?: any; // ok
  "house.owner.rating"?: any; // ok
  "house.hasBalcony"?: any; // ok
};

const helperMinMax = (obj: { min?: number; max?: number }): any => {
  if (obj.min) {
    if (obj.max) return { $gte: obj.min, $lte: obj.max };
    return { $gt: obj.min };
  }
  if (obj.max) return { $lt: obj.max };
  return null;
};
const filtersToMatches = (filters: AdvListFilters): Matches => {
  if (!filters) return {};
  const matches: Matches = {};

  // FIXME: add match by title
  // if (filters.title !== undefined) matches.title = { $regex: filters.title, $options: "gmi" };

  // if (filters.price) {
  //   if (filters.price.min) {
  //     if (filters.price.max) matches.matches = { $gt: filters.price.min, $lt: filters.price.max };
  //     else matches.price = { $gt: filters.price.min };
  //   } else if (filters.price.max) matches.price = { $lt: filters.price.max };
  // }
  const priceMinMax = helperMinMax(filters.price);
  if (priceMinMax) matches.price = priceMinMax;

  const sizeMinMax = helperMinMax(filters.size);
  if (sizeMinMax) matches.size = sizeMinMax;

  const countBathroomsMinMax = helperMinMax(filters.countBathrooms);
  if (countBathroomsMinMax) matches.countBathrooms = countBathroomsMinMax;

  const ratingMinMax = helperMinMax(filters.rating);
  if (ratingMinMax) matches["house.rating"] = ratingMinMax;

  const ownerRatingMinMax = helperMinMax(filters.ownerRating);
  if (ownerRatingMinMax) matches["house.owner.rating"] = ownerRatingMinMax;

  if (filters.hasBalcony !== undefined) matches["house.hasBalcony"] = filters.hasBalcony;
  if (filters.target !== undefined) matches.target = filters.target;
  if (filters.finishing !== undefined) matches["house.finishing"] = filters.finishing;

  return matches;
};

const post: ServerApiHandler<AdvListRequestData, AdvListResponseData> = async (req, res) => {
  const { body } = req;
  const filters = body.data;
  const page = body.page === undefined ? 0 : body.page;
  const limit = body.limit === undefined ? 10 : body.limit;
  const matches = filtersToMatches(filters);
  const aggRes: PaginatedAgregateResponse<Advertisement> = (
    await AdvertisementDBModel.aggregate([
      { $lookup: { from: "houses", localField: "house", foreignField: "_id", as: "house" } },
      { $set: { house: { $first: "$house" } } },
      { $lookup: { from: UserDBModel.collection.name, localField: "house.owner", foreignField: "_id", as: "house.owner" } },
      { $set: { "house.owner": { $first: "$house.owner" } } },
      { $lookup: { from: TagDBModel.collection.name, localField: "tags", foreignField: "_id", as: "tags" } },
      { $match: matches },
      {
        $facet: {
          totalRecords: [
            {
              $count: "total",
            },
          ],
          data: [{ $skip: limit * page }, { $limit: limit }],
        },
      },
    ])
  )[0];
  // ])) as unknown as PaginatedAgregateResponse<Advertisement>[];

  res.status(200).json({
    success: true,
    data: {
      data: aggRes.data,
      page: page || 0,
      limit: limit || 0,
      total: aggRes.totalRecords[0]?.total || 0,
    },
  });
};

export default apiHandleMethods().post(post).prepare();
