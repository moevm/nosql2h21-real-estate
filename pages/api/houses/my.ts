import apiHandleMethods from "lib/apiHandleMethods";
import { HouseListResponseData, ErrorMessagesTypes, LoggedInRequestData, ServerApiHandler } from "core/types/api";
import { HouseDBModel, UserDBModel } from "lib/db/shema";
import withAuthorizedUser from "../../../lib/middlewares/withAuthorizedUser";

// Bundles User.
const get: ServerApiHandler<LoggedInRequestData, HouseListResponseData> = withAuthorizedUser(async (req, res, user) => {
  const data = await HouseDBModel.aggregate([
    {
      $lookup: {
        from: UserDBModel.collection.name,
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $set: {
        owner: { $first: "$owner" },
      },
    },
    {
      $match: {
        "owner._id": user._id,
      },
    },
  ]);
  if (!data) throw Error(ErrorMessagesTypes.err404);

  res.status(200).json({ success: true, data });
});

export default apiHandleMethods().get(get).prepare();
