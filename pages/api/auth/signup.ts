import { ServerApiHandler, SignUpResponseData, SignUpRequestData } from "core/types/api";
import { encodePassword, generateJWT } from "lib/auth";
import { UserDBModel } from "lib/db/shema";
import { serialize } from "cookie";
import apiHandleMethods from "lib/apiHandleMethods";

const post: ServerApiHandler<SignUpRequestData, SignUpResponseData> = async (req, res) => {
  const data = req.body;
  await UserDBModel.findOne({ email: data.email }).then((resUser) => {
    if (resUser !== null) throw new Error("user with such an email already exists");
  });

  const encodedPassword = await encodePassword(data.password!);
  const resUser = await UserDBModel.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: encodedPassword,
    rating: 0,
    avatar: null,
  });

  const jwt = generateJWT(resUser);
  res.setHeader("Set-Cookie", [serialize("accessToken", jwt)]);

  delete resUser.password;
  res.status(200).json({ success: true, data: resUser });
};

export default apiHandleMethods().post(post).prepare();
