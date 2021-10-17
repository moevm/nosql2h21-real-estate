import { User, Advertisement, House, Tag, Reply, Address } from "core/models";
import { Schema, model, models } from "mongoose";

/* User */
const UserModelSchema = new Schema<User>(
  {
    _id: Schema.Types.ObjectId,
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    email: { type: Schema.Types.String, lowercase: true },
    password: Schema.Types.String,
    rating: Schema.Types.String,
    avatar: Schema.Types.String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

delete models.User;
export const UserDBModel = model<User>("User", UserModelSchema);

/* Tag */
const TagModelSchema = new Schema<Tag>(
  {
    _id: Schema.Types.ObjectId,
    name: Schema.Types.String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

delete models.Tag;
export const TagDBModel = model<Tag>("Tag", TagModelSchema);

/* Reply */
const ReplyModelSchema = new Schema<Reply>(
  {
    _id: Schema.Types.ObjectId,
    owner: UserModelSchema,
    text: Schema.Types.String,
    rating: Schema.Types.Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

delete models.Reply;
export const ReplyDBModel = model<Reply>("Reply", ReplyModelSchema);

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
export const AddressDBModel = model<Address>("Address", AddressModelSchema);

/* House */
const HouseModelSchema = new Schema<House>(
  {
    _id: Schema.Types.String,
    owner: UserModelSchema,
    address: AddressModelSchema,
    photo: [Schema.Types.String],
    description: Schema.Types.String,
    type: [0, 1, 2],
    size: Schema.Types.Number,
    hasBalcony: Schema.Types.Boolean,
    countBathrooms: Schema.Types.Number,
    countRoom: Schema.Types.Number,
    year: Schema.Types.Number,
    finishing: [0, 1],
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
    _id: Schema.Types.ObjectId,
    owner: UserModelSchema,
    title: Schema.Types.String,
    price: Schema.Types.Number,
    house: HouseModelSchema,
    target: [0, 1],
    tags: [TagModelSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

delete models.Advertisement;
export const AdvertisementDBModel = model<Advertisement>("Advertisement", AdvertisementModelSchema);
