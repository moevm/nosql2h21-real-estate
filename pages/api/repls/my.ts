import apiHandleMethods from "lib/apiHandleMethods";
import { ReplyListResponseData, ErrorMessagesTypes, ServerApiHandler, ReplyListRequestData } from "core/types/api";
import { HouseDBModel } from "lib/db/shema";
import withAuthorizedUser from "../../../lib/middlewares/withAuthorizedUser";

// Bundles nothing.
const get: ServerApiHandler<ReplyListRequestData, ReplyListResponseData> = withAuthorizedUser(async (req, res, user) => {
  const data = await HouseDBModel.aggregate([
    {
      $unwind: "$replies",
    },
    {
      $match: {
        "replies.owner": user._id,
      },
    },
    {
      $replaceRoot: { newRoot: "$replies" },
    },
  ]);

  if (!data) throw Error(ErrorMessagesTypes.err404);

  res.status(200).json({ success: true, data });
});

export default apiHandleMethods().get(get).prepare();
