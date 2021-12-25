// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Advertisement } from "core/models";
import { generateDBData } from "generator";
import { connection, Mongoose } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
  // data: Advertisement[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {
  await connection.db.dropDatabase();
  const data = await generateDBData();
  res.status(200).json({ data });
}
