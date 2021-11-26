// prettier-ignore
// eslint-disable-next-line max-len
import { HouseResponseData, ErrorMessagesTypes, ServerApiHandler, ReplyResponseData, HouseRequestData, HouseCreateRequestData } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { HouseDBModel } from "lib/db/shema";
import withAuthorizedUser from "../../../lib/middlewares/withAuthorizedUser";

// Bundles User.
const get: ServerApiHandler<HouseRequestData, HouseResponseData> = async (req, res) => {
  const { id } = req.query;

  const data = await HouseDBModel.findById(id).populate("owner");
  if (!data) throw new Error(ErrorMessagesTypes.err404);

  res.status(200).json({ success: true, data });
};

// Bundles nothing.
const put: ServerApiHandler<HouseCreateRequestData, HouseResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;
  const data = req.body;

  delete data._id;
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.owner;

  const nova = await HouseDBModel.findById(id);
  if (!nova) throw Error(ErrorMessagesTypes.err404);

  data.lenToMetro = 0; // TODO: count length to metro, it might have changed.
  data.rating = nova.rating;
  data.replies = nova.replies;

  const houseOwner = nova.owner._id as any;
  if (!houseOwner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  const result = await HouseDBModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  res.status(200).json({ success: true, data: result });
});

// Bundles nothing.
const del: ServerApiHandler<HouseRequestData, HouseResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;

  const data = await HouseDBModel.findById(id);
  if (!data) throw Error(ErrorMessagesTypes.err404);

  const houseOwner = data.owner._id as any;
  if (!houseOwner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  await HouseDBModel.findByIdAndDelete(id);

  res.status(200).json({ success: true, data });
});

// Bundles nothing.
const post: ServerApiHandler<HouseRequestData, ReplyResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;
  const data = req.body;

  // TODO: renew house rating.

  delete data._id;
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;

  data.owner = user._id;

  const house = await HouseDBModel.findByIdAndUpdate(id, { $push: { replies: data } }, { new: true });
  if (!house) throw new Error(ErrorMessagesTypes.err404);

  const result = house.replies.slice(-1)[0];
  res.status(200).json({ success: true, data: result });
});

export default apiHandleMethods().get(get).put(put).post(post).delete(del).prepare();
