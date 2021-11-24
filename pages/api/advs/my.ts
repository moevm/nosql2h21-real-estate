import apiHandleMethods from "lib/apiHandleMethods";
import { AdvListResponseData, ErrorMessagesTypes, ServerApiHandler } from "core/types/api";
import { AdvertisementDBModel } from "lib/db/shema";
import withAuthorizedUser from "../../../lib/middlewares/withAuthorizedUser";

const get: ServerApiHandler<{}, AdvListResponseData> = withAuthorizedUser(async (req, res, user) => {
  // FIXME: the line just won't follow documentation https://docs.mongodb.com/manual/tutorial/query-embedded-documents/#query-on-nested-field
  const data = await AdvertisementDBModel.find({ "house.owner._id": user._id }).populate({
    path: "house",
    populate: {
      path: "owner",
    },
  });
  if (!data) throw Error(ErrorMessagesTypes.err404);

  res.status(200).json({ success: true, data });
});

export default apiHandleMethods().get(get).prepare();
