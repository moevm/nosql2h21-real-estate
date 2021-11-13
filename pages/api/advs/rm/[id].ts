import { NextApiRequest, NextApiResponse } from "next";
import { AdvResponseData, ErrorMessagesTypes } from "../../../../core/types/api";
import dbConnect from "../../../../lib/db/dbConnect";
import { AdvertisementDBModel } from "../../../../lib/db/shema";
import getAuthorizedUser from "../../../../lib/auth/getAuthorizedUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AdvResponseData>): Promise<void> {
  try {
    if (req.method !== "GET") throw Error("Only GET requests allowed!");
    const user = await getAuthorizedUser(req);
    const { id } = req.query;
    await dbConnect();

    const data = await AdvertisementDBModel.findById(id);
    if (!data) throw Error(ErrorMessagesTypes.err404);
    if (data._id !== user!!._id) throw Error(ErrorMessagesTypes.err401);
    await AdvertisementDBModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(200).json({ success: false, error: error.message });
    }
  }
}
