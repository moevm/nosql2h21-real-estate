import apiHandleMethods from "lib/apiHandleMethods";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";
import { HouseCreateRequestData, HouseResponseData, ServerApiHandler } from "core/types/api";
import { HouseDBModel } from "lib/db/shema";

// Bundles nothing.
const post: ServerApiHandler<HouseCreateRequestData, HouseResponseData> = withAuthorizedUser(async (req, res, user) => {
  const data = req.body;

  delete data._id;
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;
  data.owner = user._id;
  data.lenToMetro = 0; // TODO: count length to metro.
  data.rating = 5;
  data.replies = [];

  const result = await new HouseDBModel(data).save();
  res.status(200).json({ success: true, data: result });
});

export default apiHandleMethods().post(post).prepare();
