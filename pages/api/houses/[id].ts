// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HouseResponseData, ErrorMessagesTypes, ServerApiHandler, AdvResponseData } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import { HouseDBModel } from "lib/db/shema";
import withAuthorizedUser from "../../../lib/middlewares/withAuthorizedUser";

const get: ServerApiHandler<{}, HouseResponseData> = async (req, res) => {
  const { id } = req.query;

  const data = await HouseDBModel.findById(id).populate("owner");
  if (!data) throw new Error(ErrorMessagesTypes.err404);

  res.status(200).json({ success: true, data });
};

const del: ServerApiHandler<{}, AdvResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;

  const data = await HouseDBModel.findById(id).populate("owner");
  if (!data) throw Error(ErrorMessagesTypes.err404);

  const houseOwner = data.owner._id as any;
  if (!houseOwner.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  await HouseDBModel.findByIdAndDelete(id);

  res.status(200).json({ success: true, data });
});

export default apiHandleMethods().get(get).delete(del).prepare();
