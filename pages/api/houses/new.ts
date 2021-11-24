import apiHandleMethods from "lib/apiHandleMethods";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";
import { AdvResponseData, ServerApiHandler } from "core/types/api";
import { HouseDBModel } from "lib/db/shema";

const post: ServerApiHandler<{}, AdvResponseData> = withAuthorizedUser(async (req, res, user) => {
  const data = req.body;

  data.owner = user._id;
  data.lenToMetro = 0; // TODO: count length to metro.
  data.rating = 5;
  data.replies = [];

  const result = await new HouseDBModel(data).save();
  res.status(200).json({ success: true, data: result });
});

export default apiHandleMethods().post(post).prepare();
