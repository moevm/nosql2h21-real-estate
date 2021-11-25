import apiHandleMethods from "lib/apiHandleMethods";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";
import { AdvResponseData, ErrorMessagesTypes, ServerApiHandler } from "core/types/api";
import { AdvertisementDBModel, HouseDBModel, TagDBModel } from "lib/db/shema";

// Bundles nothing
const post: ServerApiHandler<{}, AdvResponseData> = withAuthorizedUser(async (req, res, user) => {
  const data = req.body;

  const houseOwner = (await HouseDBModel.findById(data.house))!!.owner._id as any;
  if (!houseOwner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

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
