// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HouseListResponseData } from "core/types/api";
import dbConnect from "lib/db/dbConnect";
import { HouseDBModel } from "lib/db/shema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<HouseListResponseData>): Promise<void> {
  try {
    await dbConnect();
    const data = await HouseDBModel.find().populate("owner");
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(200).json({ success: false, error: error.message });
    }
  }
}
