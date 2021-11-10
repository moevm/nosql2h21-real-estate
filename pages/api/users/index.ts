// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserListResquestData } from "core/types/api";
import dbConnect from "lib/db/dbConnect";
import { UserDBModel } from "lib/db/shema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserListResquestData>): Promise<void> {
  try {
    await dbConnect();
    const data = await UserDBModel.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(200).json({ success: false, error: error.message });
    }
  }
}
