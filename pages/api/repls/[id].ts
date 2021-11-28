import apiHandleMethods from "serverSide/apiHandleMethods";
import withAuthorizedUser from "serverSide/middlewares/withAuthorizedUser";
import { ErrorMessagesTypes, HouseRequestData, ReplyRequestData, ReplyResponseData, ServerApiHandler } from "core/types/api";
import { HouseDBModel } from "serverSide/db/shema";

function appendToKeys(str: string, ob: any): any {
  return Object.keys(ob).reduce((p: any, c: any): any => {
    if (typeof ob[c] === "object") {
      Object.entries(appendToKeys(`${str}.${c}`, ob[c])).forEach((v) => {
        // eslint-disable-next-line prefer-destructuring,no-param-reassign
        p[`${c}.${v[0]}`] = v[1];
      });
      return p;
    }
    // eslint-disable-next-line no-param-reassign
    p[`${str}.${c}`] = ob[c];
    return p;
  }, {});
}

// Bundles nothing, adds house _id.
const get: ServerApiHandler<ReplyRequestData, ReplyResponseData> = async (req, res) => {
  const { id } = req.query;

  const house = await HouseDBModel.findOne({ "replies._id": id });
  if (!house) throw new Error(ErrorMessagesTypes.err404);

  const result = (house.replies as any).id(id).toObject();
  result.house = house._id;
  res.status(200).json({ success: true, data: result });
};

// Bundles nothing.
const put: ServerApiHandler<HouseRequestData, ReplyResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;
  const data = req.body;

  // TODO: renew house rating.

  delete data._id;
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;

  const house = await HouseDBModel.findOneAndUpdate(
    { "replies._id": id, "replies.owner": user._id },
    { $set: appendToKeys("replies.$[reply]", data) },
    { new: true, arrayFilters: [{ "reply._id": id }] },
  );
  if (!house) throw new Error(ErrorMessagesTypes.err404);

  const result = (house.replies as any).id(id);
  res.status(200).json({ success: true, data: result });
});

// Bundles nothing.
const del: ServerApiHandler<ReplyRequestData, ReplyResponseData> = withAuthorizedUser(async (req, res, user) => {
  const { id } = req.query;

  const house = await HouseDBModel.findOneAndUpdate(
    { "replies._id": id, "replies.owner": user._id },
    { $pull: { replies: { _id: id } } },
  );
  if (!house) throw new Error(ErrorMessagesTypes.err404);

  const result = (house.replies as any).id(id);
  res.status(200).json({ success: true, data: result });
});

export default apiHandleMethods().get(get).put(put).delete(del).prepare();
