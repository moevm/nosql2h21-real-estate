// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HouseResponseData, ErrorMessagesTypes } from "core/types/api";
import dbConnect from "lib/db/dbConnect";
import { HouseDBModel } from "lib/db/shema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<HouseResponseData>): Promise<void> {
  try {
    const { id } = req.query;
    await dbConnect();
    const data = await HouseDBModel.findById(id).populate("owner");
    if (!data) throw new Error(ErrorMessagesTypes.err404);
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(200).json({ success: false, error: error.message });
    }
  }
}
