// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HouseResponseData, ErrorMessagesTypes, ServerApiHandler, AdvResponseData, ReplyResponseData } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { HouseDBModel } from "lib/db/shema";
import withAuthorizedUser from "../../../lib/middlewares/withAuthorizedUser";

// Bundles User
const get: ServerApiHandler<{}, HouseResponseData> = async (req, res) => {
  const { id } = req.query;

  const data = await HouseDBModel.findById(id).populate("owner");
  if (!data) throw new Error(ErrorMessagesTypes.err404);

  res.status(200).json({ success: true, data });
};

// Bundles nothing
const del: ServerApiHandler<{}, AdvResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;

  const data = await HouseDBModel.findById(id);
  if (!data) throw Error(ErrorMessagesTypes.err404);

  const houseOwner = data.owner._id as any;
  if (!houseOwner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  await HouseDBModel.findByIdAndDelete(id);

  res.status(200).json({ success: true, data });
});

// Bundles nothing.
const post: ServerApiHandler<{}, ReplyResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;

  const data = req.body;

  data.rating = data.rating > 5 ? 5 : data.rating;
  data.rating = data.rating < 0 ? 0 : data.rating;

  const house = await HouseDBModel.findByIdAndUpdate(
    id,
    { $push: { replies: { owner: user._id, text: data.text, rating: data.rating } } },
    { new: true },
  );
  if (!house) throw new Error(ErrorMessagesTypes.err404);

  const result = house.replies.slice(-1)[0];

  res.status(200).json({ success: true, data: result });
});

export default apiHandleMethods().get(get).post(post).delete(del).prepare();
