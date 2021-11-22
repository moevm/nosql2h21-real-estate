import apiHandleMethods from "serverSide/apiHandleMethods";
import withAuthorizedUser from "serverSide/middlewares/withAuthorizedUser";
import { AdvReadResponseData, ErrorMessagesTypes, ServerApiHandler } from "core/types/api";
import { AdvertisementDBModel, HouseDBModel, TagDBModel } from "serverSide/db/shema";

// FIXME: change body type
const post: ServerApiHandler<{}, AdvReadResponseData> = withAuthorizedUser(async (req, res, user) => {
  const ins = JSON.parse(req.body);
  ins.house = HouseDBModel.findById(ins.house).populate("owner");
  if (ins.house.owner._id !== user!!._id) throw Error(ErrorMessagesTypes.err401);
  ins.tags = TagDBModel.find({ value: { $in: ins.tags } });

  const adv = new AdvertisementDBModel(ins);
  const data = await adv.save();
  res.status(200).json({ success: true, data });
});

export default apiHandleMethods().post(post).prepare();
