import apiHandleMethods from "lib/apiHandleMethods";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";
import { ErrorMessagesTypes, ReplyResponseData, ServerApiHandler } from "core/types/api";
import { HouseDBModel } from "lib/db/shema";

// Bundles nothing, adds house _id.
const get: ServerApiHandler<{}, ReplyResponseData> = async (req, res) => {
  const { id } = req.query;

  const house = await HouseDBModel.findOne({ "replies._id": id });
  if (!house) throw new Error(ErrorMessagesTypes.err404);

  const result = (house.replies as any).id(id);

  const finalResult = JSON.parse(JSON.stringify(result));
  finalResult.house = house._id;

  res.status(200).json({ success: true, data: finalResult });
};

// Bundles nothing.
const del: ServerApiHandler<{}, ReplyResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;

  const house = await HouseDBModel.findOne({ "replies._id": id });
  if (!house) throw new Error(ErrorMessagesTypes.err404);

  const result = (house.replies as any).id(id);
  if (!result.owner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  await house.updateOne({ $pull: { replies: { _id: id } } }, { new: true });

  res.status(200).json({ success: true, data: result });
});

export default apiHandleMethods().get(get).delete(del).prepare();
