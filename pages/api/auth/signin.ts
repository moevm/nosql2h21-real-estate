import { ServerApiHandler, SignInResponseData, SignUpRequestData } from "core/types/api";
import { comparePasswords, generateJWT } from "lib/auth";
import { UserDBModel } from "lib/db/shema";
import { serialize } from "cookie";
import apiHandleMethods from "lib/apiHandleMethods";

// Bundles nothing.
const put: ServerApiHandler<SignUpRequestData, SignInResponseData> = async (req, res) => {
  const data = req.body;

  const result = (await UserDBModel.findOne({ email: data.email })).toObject();
  if (!result) throw new Error("user was not found");

  const correctPassword = await comparePasswords(data.password!, result.password!);
  if (!correctPassword) throw new Error("invalid password");

  const jwt = generateJWT(result);
  res.setHeader("Set-Cookie", [serialize("accessToken", jwt)]);

  delete result.password;
  res.status(200).json({ success: true, data: result });
};

export default apiHandleMethods().put(put).prepare();
