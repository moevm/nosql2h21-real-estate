import { enumToNumArray } from "core/helpers/enumToNumArray";
import { User, Advertisement, House, Tag, Reply, Address, HouseType, FinishingType, AdvTargetType } from "core/models";
import { Schema, model, models } from "mongoose";

/* User */
const UserModelSchema = new Schema<User>(
  {
    firstName: { type: Schema.Types.String, required: true },
    lastName: Schema.Types.String,
    email: { type: Schema.Types.String, lowercase: true, required: true, unique: true },
    password: { type: Schema.Types.String, required: true, minLength: 5 },
    rating: { type: Schema.Types.Number, required: true, min: 0, max: 5 },
    avatar: Schema.Types.String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

delete models.User;
export const UserDBModel = model<User>("User", UserModelSchema);

/* Tag */
const TagModelSchema = new Schema<Tag>(
  {
    value: { type: Schema.Types.String, required: true, lowercase: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

delete models.Tag;
export const TagDBModel = model<Tag>("Tag", TagModelSchema);

/* Reply */
const ReplyModelSchema = new Schema<Reply>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: Schema.Types.String, required: true },
    rating: { type: Schema.Types.Number, required: true, min: 0, max: 5 },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

/* Address */
const AddressModelSchema = new Schema<Address>(
  {
    lat: { type: Schema.Types.Number, required: true, min: -180, max: 180 },
    lng: { type: Schema.Types.Number, required: true, min: -180, max: 180 },
    value: Schema.Types.String,
    floor: { type: Schema.Types.Number, min: 0 },
    door: { type: Schema.Types.Number, min: 0 },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

/* House */
const HouseModelSchema = new Schema<House>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: AddressModelSchema, required: true },
    photo: [Schema.Types.String],
    description: Schema.Types.String,
    type: { type: Number, default: HouseType.house, enum: enumToNumArray(HouseType), required: true },
    size: { type: Schema.Types.Number, required: true },
    hasBalcony: { type: Schema.Types.Boolean, required: true },
    countBathrooms: { type: Schema.Types.Number, required: true },
    countRoom: { type: Schema.Types.Number, required: true },
    year: { type: Schema.Types.Number, required: true },
    finishing: { type: Number, default: FinishingType.norm, enum: enumToNumArray(FinishingType), required: true },
    lenToMetro: { type: Schema.Types.Number, required: true },
    rating: { type: Schema.Types.Number, required: true, min: 0, max: 5 },
    replies: [ReplyModelSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

delete models.House;
export const HouseDBModel = model<House>("House", HouseModelSchema);

/* Advertisement */
const AdvertisementModelSchema = new Schema<Advertisement>(
  {
    title: { type: Schema.Types.String, required: true },
    price: { type: Schema.Types.Number, required: true },
    house: { type: Schema.Types.ObjectId, ref: "House", required: true },
    target: { type: Number, default: AdvTargetType.rents, enum: enumToNumArray(AdvTargetType), required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

delete models.Advertisement;
export const AdvertisementDBModel = model<Advertisement>("Advertisement", AdvertisementModelSchema);
