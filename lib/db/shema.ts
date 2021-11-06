import { Address, Advertisement, AdvTarget, FinishingType, House, HouseType, Reply, Tag, User } from "core/models";
import { model, models, Schema } from "mongoose";

/* User */
const UserModelSchema = new Schema<User>(
  {
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    email: { type: Schema.Types.String, lowercase: true },
    password: Schema.Types.String,
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
    name: Schema.Types.String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

delete models.Tag;

/* Reply */
const ReplyModelSchema = new Schema<Reply>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    text: Schema.Types.String,
    rating: Schema.Types.Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

delete models.Reply;

/* Address */
const AddressModelSchema = new Schema<Address>(
  {
    x: Schema.Types.Number,
    y: Schema.Types.Number,
    value: Schema.Types.String,
    floor: Schema.Types.Number,
    door: Schema.Types.Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

delete models.Address;

/* House */
const HouseModelSchema = new Schema<House>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    address: AddressModelSchema,
    photo: [Schema.Types.String],
    description: Schema.Types.String,
    type: [HouseType.house, HouseType.flat, HouseType.apartment],
    size: Schema.Types.Number,
    hasBalcony: Schema.Types.Boolean,
    countBathrooms: Schema.Types.Number,
    countRoom: Schema.Types.Number,
    year: Schema.Types.Number,
    finishing: [FinishingType.NORM, FinishingType.NENORM],
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
    owner: UserModelSchema,
    title: Schema.Types.String,
    price: Schema.Types.Number,
    house: HouseModelSchema,
    target: [AdvTarget.rents, AdvTarget.sell],
    tags: [TagModelSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

delete models.Advertisement;
export const AdvertisementDBModel = model<Advertisement>("Advertisement", AdvertisementModelSchema);
