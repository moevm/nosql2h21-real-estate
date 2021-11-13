// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ErrorMessagesTypes, UserResponseData } from "core/types/api";
import dbConnect from "lib/db/dbConnect";
import { UserDBModel } from "lib/db/shema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserResponseData>): Promise<void> {
  try {
    const { id } = req.query;
    await dbConnect();
    const data = await UserDBModel.findById(id);
    if (!data) throw new Error(ErrorMessagesTypes.err404);
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(200).json({ success: false, error: error.message });
    }
  }
}
