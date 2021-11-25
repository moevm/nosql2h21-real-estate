import { ServerApiHandler, SignUpResponseData, SignUpRequestData } from "core/types/api";
import { encodePassword, generateJWT } from "lib/auth";
import { UserDBModel } from "lib/db/shema";
import { serialize } from "cookie";
import apiHandleMethods from "lib/apiHandleMethods";

// Bundles nothing.
const post: ServerApiHandler<SignUpRequestData, SignUpResponseData> = async (req, res) => {
  const data = req.body as any;

  const user = await UserDBModel.findOne({ email: data.email });
  if (user) throw new Error("user with such an email already exists");

  delete data._id;
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;
  data.password = await encodePassword(data.password!);
  data.rating = 5;
  data.avatar = null; // TODO: avatar uploading.

  const result = await new UserDBModel(data).save();

  const jwt = generateJWT(result);
  res.setHeader("Set-Cookie", [serialize("accessToken", jwt)]);

  delete result.password;
  res.status(200).json({ success: true, data: result });
};

export default apiHandleMethods().post(post).prepare();
