// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { AdvResponseData, ErrorMessagesTypes } from "../../../core/types/api";
import dbConnect from "../../../lib/db/dbConnect";
import { AdvertisementDBModel, HouseDBModel, TagDBModel } from "../../../lib/db/shema";
import getAuthorizedUser from "../../../lib/auth/getAuthorizedUser";

// Accepts object similar to Advertisement, but with _id in house field and [string] in tags field
export default async function handler(req: NextApiRequest, res: NextApiResponse<AdvResponseData>): Promise<void> {
  try {
    if (req.method !== "POST") throw Error("Only POST requests allowed!");
    const user = await getAuthorizedUser(req);

    await dbConnect();
    const ins = JSON.parse(req.body);
    ins.house = HouseDBModel.findById(ins.house).populate("owner");
    if (ins.house.owner._id !== user!!._id) throw Error(ErrorMessagesTypes.err401);
    ins.tags = TagDBModel.find({ value: { $in: ins.tags } });

    const adv = new AdvertisementDBModel(ins);
    const data = await adv.save();
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(200).json({ success: false, error: error.message });
    }
  }
}
