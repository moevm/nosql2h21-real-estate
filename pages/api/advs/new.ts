import apiHandleMethods from "lib/apiHandleMethods";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";
import { AdvResponseData, ErrorMessagesTypes, ServerApiHandler } from "core/types/api";
import { AdvertisementDBModel, HouseDBModel } from "lib/db/shema";

const post: ServerApiHandler<{}, AdvResponseData> = withAuthorizedUser(async (req, res, user) => {
  const data = req.body;

  const houseOwner = (await HouseDBModel.findById(data.house))!!.owner._id as any;
  if (!houseOwner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  const result = await new AdvertisementDBModel(data).save();
  res.status(200).json({ success: true, data: result });
});

export default apiHandleMethods().post(post).prepare();
