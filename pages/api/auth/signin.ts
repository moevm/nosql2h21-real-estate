import { ServerApiHandler, SignInResponseData, SignUpRequestData } from "core/types/api";
import { comparePasswords, generateJWT } from "serverSide/auth";
import { UserDBModel } from "serverSide/db/shema";
import { serialize } from "cookie";
import apiHandleMethods from "serverSide/apiHandleMethods";

const post: ServerApiHandler<SignUpRequestData, SignInResponseData> = async (req, res) => {
  const data = req.body;

  const result = await UserDBModel.findOne({ email: data.email }).select("+passwors");
  if (!result) throw new Error("user was not found");

  const correctPassword = await comparePasswords(data.password!, result.password!);
  if (!correctPassword) throw new Error("invalid password");

  const jwt = generateJWT(result);
  res.setHeader("Set-Cookie", [serialize("accessToken", jwt, { path: "/" })]);

  const finalResult = result.toObject();
  delete finalResult.password;
  res.status(200).json({ success: true, data: finalResult });
};

// export default post;
export default apiHandleMethods().post(post).prepare();
