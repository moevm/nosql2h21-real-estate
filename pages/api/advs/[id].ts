// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AdvResponseData, ErrorMessagesTypes } from "core/types/api";
import dbConnect from "lib/db/dbConnect";
import { AdvertisementDBModel } from "lib/db/shema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AdvResponseData>): Promise<void> {
  try {
    const { id } = req.query;
    await dbConnect();
    const data = await AdvertisementDBModel.findById(id).populate("tags");
    if (!data) throw new Error(ErrorMessagesTypes.err404);
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(200).json({ success: false, error: error.message });
    }
  }
}
