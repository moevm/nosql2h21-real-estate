import apiHandleMethods from "lib/apiHandleMethods";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";
import { AdvCreateRequestData, AdvReadResponseData, ErrorMessagesTypes, ServerApiHandler } from "core/types/api";
import { AdvertisementDBModel, HouseDBModel, TagDBModel } from "lib/db/shema";

// Bundles nothing.
const post: ServerApiHandler<AdvCreateRequestData, AdvReadResponseData> = withAuthorizedUser(async (req, res, user) => {
  const data = req.body;

  const houseOwner = (await HouseDBModel.findById(data.house))!!.owner._id as any;
  if (!houseOwner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  delete data._id;
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;

  data.tags = await Promise.all(
    data.tags.map(async (tag: string) => {
      const inside = await TagDBModel.findOne({ value: tag });
      if (inside) return inside._id;
      return (await new TagDBModel({ value: tag }).save())._id;
    }),
  );

  const result = await new AdvertisementDBModel(data).save();
  res.status(200).json({ success: true, data: result });
});

export default apiHandleMethods().post(post).prepare();
