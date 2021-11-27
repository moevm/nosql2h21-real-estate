import { enumToNumArray } from "core/helpers/enumToNumArray";
import { User, Advertisement, House, Tag, Reply, Address, HouseType, FinishingType, AdvTargetType } from "core/models";
import { Schema, model, models } from "mongoose";

/* User */
const UserModelSchema = new Schema<User>(
  {
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    email: { type: Schema.Types.String, lowercase: true },
    password: { type: Schema.Types.String, select: false },
    rating: Schema.Types.Number,
    avatar: Schema.Types.String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

delete models.User;
export const UserDBModel = model<User>("User", UserModelSchema);

/* Tag */
const TagModelSchema = new Schema<Tag>(
  {
    value: Schema.Types.String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

delete models.Tag;
export const TagDBModel = model<Tag>("Tag", TagModelSchema);

/* Reply */
const ReplyModelSchema = new Schema<Reply>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    text: Schema.Types.String,
    rating: Schema.Types.Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

/* Address */
const AddressModelSchema = new Schema<Address>(
  {
    lat: Schema.Types.Number,
    lng: Schema.Types.Number,
    value: Schema.Types.String,
    floor: Schema.Types.Number,
    door: Schema.Types.Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

/* House */
const HouseModelSchema = new Schema<House>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    address: AddressModelSchema,
    photo: [Schema.Types.String],
    description: Schema.Types.String,
    type: {
      type: Number,
      default: HouseType.house,
      enum: enumToNumArray(HouseType),
    },
    size: Schema.Types.Number,
    hasBalcony: Schema.Types.Boolean,
    countBathrooms: Schema.Types.Number,
    countRoom: Schema.Types.Number,
    year: Schema.Types.Number,
    finishing: {
      type: Number,
      default: FinishingType.norm,
      enum: enumToNumArray(FinishingType),
    },
    lenToMetro: Schema.Types.Number,
    rating: Schema.Types.Number,
    replies: [ReplyModelSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

delete models.House;
export const HouseDBModel = model<House>("House", HouseModelSchema);

/* Advertisement */
const AdvertisementModelSchema = new Schema<Advertisement>(
  {
    title: Schema.Types.String,
    price: Schema.Types.Number,
    house: { type: Schema.Types.ObjectId, ref: "House" },
    target: {
      type: Number,
      default: AdvTargetType.rents,
      enum: enumToNumArray(AdvTargetType),
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

delete models.Advertisement;
export const AdvertisementDBModel = model<Advertisement>("Advertisement", AdvertisementModelSchema);
