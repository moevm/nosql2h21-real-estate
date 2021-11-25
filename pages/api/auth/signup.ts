import { ServerApiHandler, SignUpResponseData, SignUpRequestData, UserResponseData, LoggedInRequestData } from "core/types/api";
import { encodePassword, generateJWT } from "lib/auth";
import { UserDBModel } from "lib/db/shema";
import { serialize } from "cookie";
import apiHandleMethods from "lib/apiHandleMethods";
import withAuthorizedUser from "../../../lib/middlewares/withAuthorizedUser";

const post: ServerApiHandler<SignUpRequestData, SignUpResponseData> = async (req, res) => {
  const data = req.body as any;

  const user = await UserDBModel.findOne({ email: data.email });
  if (user) throw new Error("user with such an email already exists");

  data.password = await encodePassword(data.password!);
  data.rating = 5;
  data.avatar = null;

  const result = await new UserDBModel(data).save();

  const jwt = generateJWT(result);
  res.setHeader("Set-Cookie", [serialize("accessToken", jwt)]);

  delete result.password;
  res.status(200).json({ success: true, data: result });
};

const del: ServerApiHandler<LoggedInRequestData, UserResponseData> = withAuthorizedUser(async (req, res, user) => {
  const result = await UserDBModel.findByIdAndDelete(user._id);

  res.setHeader("Set-Cookie", [serialize("accessToken", "", { maxAge: 0 })]);
  res.status(200).json({ success: true, data: result });
});

export default apiHandleMethods().post(post).delete(del).prepare();
