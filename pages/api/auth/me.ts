import { ErrorMessagesTypes, LoggedInRequestData, ServerApiHandler, UserResponseData } from "core/types/api";
import apiHandleMethods from "lib/apiHandleMethods";
import withAuthorizedUser from "lib/middlewares/withAuthorizedUser";
import { serialize } from "cookie";
import { UserDBModel } from "../../../lib/db/shema";

// Bundles nothing.
const get: ServerApiHandler<LoggedInRequestData, UserResponseData> = withAuthorizedUser(async (req, res, user) => {
  res.status(200).json({ success: true, data: user });
});

// Bundles nothing.
const put: ServerApiHandler<LoggedInRequestData, UserResponseData> = withAuthorizedUser(async (req, res, user) => {
  const data = req.body;

  delete data._id;
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;

  const nova = await UserDBModel.findById(user._id);
  if (!nova) throw Error(ErrorMessagesTypes.err404);

  data.password = nova.password;
  data.rating = nova.rating;

  // TODO: avatar uploading.

  if (!nova._id.equals(user._id)) throw Error(ErrorMessagesTypes.err401);

  const result = (await UserDBModel.findByIdAndUpdate(user._id, { $set: data }, { new: true }))!!.toObject();
  delete result.password;
  res.status(200).json({ success: true, data: result });
});

// Bundles nothing.
const del: ServerApiHandler<LoggedInRequestData, UserResponseData> = withAuthorizedUser(async (req, res, user) => {
  const result = (await UserDBModel.findByIdAndDelete(user._id))?.toObject();
  delete result?.password;

  res.setHeader("Set-Cookie", [serialize("accessToken", "", { maxAge: 0, path: "/" })]);
  res.status(200).json({ success: true, data: result });
});

export default apiHandleMethods().get(get).put(put).delete(del).prepare();
