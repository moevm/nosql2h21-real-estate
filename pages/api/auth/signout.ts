import { SignOutResponseData } from "core/types/api";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

async function handler(req: NextApiRequest, res: NextApiResponse<SignOutResponseData>): Promise<void> {
  try {
    res.setHeader("Set-Cookie", [serialize("accessToken", "", { maxAge: 0 })]);
    res.status(200).json({ success: true, data: null });
  } catch (error) {
    res.status(200).json({ success: false, error: (error as Error).message });
  }
}
export default handler;
