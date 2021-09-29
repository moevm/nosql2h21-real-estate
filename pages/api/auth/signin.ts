import { SignInResponseData, SignUpResquestData } from "core/types/api";
import { comparePasswords, generateJWT, getUserIdByJWT } from "lib/auth";
import { UserDBModel } from "lib/db/sheme";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import dbConnect from "lib/db/dbConnect";

async function handler(req: NextApiRequest, res: NextApiResponse<SignInResponseData>): Promise<void> {
  const data = req.body as SignUpResquestData;
  try {
    await dbConnect();
    const resUser = await UserDBModel.findOne({ email: data.email });
    if (resUser === null) throw new Error("user was not found");
    const correctPassword = await comparePasswords(data.password!, resUser.password!);
    if (correctPassword === false) throw new Error("invalid password");
    const jwt = generateJWT(resUser);
    const idid = getUserIdByJWT(jwt);
    res.setHeader("Set-Cookie", [serialize("accessToken", jwt)]);

    delete resUser.password;
    res.status(200).json({ success: true, data: resUser });
  } catch (error) {
    res.status(200).json({ success: false, error: (error as Error).message });
  }
}
export default handler;
