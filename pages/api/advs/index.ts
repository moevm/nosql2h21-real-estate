// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AdvListResponseData } from "core/types/api";
import dbConnect from "lib/db/dbConnect";
import { AdvertisementDBModel } from "lib/db/shema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AdvListResponseData>): Promise<void> {
  try {
    await dbConnect();
    const data = await AdvertisementDBModel.find()
      .populate("tags")
      .populate({
        path: "house",
        populate: {
          path: "owner",
        },
      });
    // .populate({
    //   path: "house",
    //   populate: {
    //     path: "replies",
    //   },
    // });
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(200).json({ success: false, error: error.message });
    }
  }
}
