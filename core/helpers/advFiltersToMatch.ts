import { AdvListFilters } from "core/types/api";

type Matches = {
  title?: any;
  target?: any;
  "house.description"?: any;
  "house.finishing"?: any;
  price?: any; // ok
  size?: any; // ok
  "house.countRoom"?: any; // ok
  "house.rating"?: any; // ok
  "house.owner.rating"?: any; // ok
  "house.hasBalcony"?: any; // ok
  "house.type"?: any; // ok
};

const helperMinMax = (obj: { min?: number; max?: number }): any => {
  if (obj.min) {
    if (obj.max) return { $gte: obj.min, $lte: obj.max };
    return { $gte: obj.min };
  }
  if (obj.max) return { $lt: obj.max };
  return null;
};
export const advFiltersToMatch = (filters: AdvListFilters): Matches => {
  if (!filters) return {};
  const matches: Matches = {};

  // FIXME: add match by title

  // if (filters.price) {
  //   if (filters.price.min) {
  //     if (filters.price.max) matches.matches = { $gt: filters.price.min, $lt: filters.price.max };
  //     else matches.price = { $gt: filters.price.min };
  //   } else if (filters.price.max) matches.price = { $lt: filters.price.max };
  // }
  if (filters.title) {
    matches.title = new RegExp(`${filters.title}`, "i");
  }
  if (filters.description) {
    matches["house.description"] = new RegExp(`${filters.description}`, "i");
  }
  if (filters.price) {
    const priceMinMax = helperMinMax(filters.price);
    if (priceMinMax) matches.price = priceMinMax;
  }

  if (filters.size) {
    const sizeMinMax = helperMinMax(filters.size);
    if (sizeMinMax) matches.size = sizeMinMax;
  }

  if (filters.countRoom) {
    const countRoomMinMax = helperMinMax(filters.countRoom);
    if (countRoomMinMax) matches["house.countRoom"] = countRoomMinMax;
  }

  if (filters.rating) {
    const ratingMinMax = helperMinMax(filters.rating);
    if (ratingMinMax) matches["house.rating"] = ratingMinMax;
  }

  if (filters.ownerRating) {
    const ownerRatingMinMax = helperMinMax(filters.ownerRating);
    if (ownerRatingMinMax) matches["house.owner.rating"] = ownerRatingMinMax;
  }

  if (filters.hasBalcony !== undefined) matches["house.hasBalcony"] = filters.hasBalcony;
  if (filters.target !== undefined) matches.target = filters.target;
  if (filters.finishing !== undefined) matches["house.finishing"] = filters.finishing;
  if (filters.houseType !== undefined) matches["house.type"] = filters.houseType;

  return matches;
};
