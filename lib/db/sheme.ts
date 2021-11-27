import { User } from "core/models";
import { Schema, model, models } from "mongoose";

/* User */
const UserModelShema = new Schema<User>(
  {
    // _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: { type: String, lowercase: true },
    password: String,
    rating: String,
    avatar: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

delete models.User;
export const UserDBModel = model<User>("User", UserModelShema);
