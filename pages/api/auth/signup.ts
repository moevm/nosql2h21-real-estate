import { SignUpResponseData, SignUpResquestData } from "core/types/api";
import { encodePassword, generateJWT } from "lib/auth";
import dbConnect from "lib/db/dbConnect";
import { UserDBModel } from "lib/db/shema";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

async function handler(req: NextApiRequest, res: NextApiResponse<SignUpResponseData>): Promise<void> {
  const data = req.body as SignUpResquestData;
  try {
    await dbConnect();

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
  } catch (error) {
    res.status(200).json({ success: false, error: (error as Error).message });
  }
}
export default handler;
