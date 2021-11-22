import { ServerApiHandler, SignInResponseData, SignUpRequestData } from "core/types/api";
import { comparePasswords, generateJWT } from "serverSide/auth";
import { UserDBModel } from "serverSide/db/shema";
import { serialize } from "cookie";
import apiHandleMethods from "serverSide/apiHandleMethods";

const post: ServerApiHandler<SignUpRequestData, SignInResponseData> = async (req, res) => {
  const data = req.body;
  const resUser = await UserDBModel.findOne({ email: data.email });
  if (!resUser) throw new Error("user was not found");

  const correctPassword = await comparePasswords(data.password!, resUser.password!);
  if (!correctPassword) throw new Error("invalid password");

  const jwt = generateJWT(resUser);
  res.setHeader("Set-Cookie", [serialize("accessToken", jwt)]);

  delete resUser.password;
  res.status(200).json({ success: true, data: resUser });
};

export default apiHandleMethods().post(post).prepare();
