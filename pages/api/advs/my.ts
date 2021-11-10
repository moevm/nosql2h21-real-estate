// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { AdvListResponseData, ErrorMessagesTypes } from "../../../core/types/api";
import dbConnect from "../../../lib/db/dbConnect";
import { AdvertisementDBModel } from "../../../lib/db/shema";
import getAuthorizedUser from "../../../lib/auth/getAuthorizedUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AdvListResponseData>): Promise<void> {
  try {
    if (req.method !== "GET") throw Error("Only GET requests allowed!");
    const user = await getAuthorizedUser(req);
    await dbConnect();

    const data = await AdvertisementDBModel.find()
      .populate({
        path: "user",
        populate: { path: "owner" },
      })
      .find({ _id: user!!._id })
      .populate("tags");
    if (!data) throw Error(ErrorMessagesTypes.err404);

    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(200).json({ success: false, error: error.message });
    }
  }
}
