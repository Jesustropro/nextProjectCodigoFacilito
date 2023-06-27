import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/mongoConfig/mongodb";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await clientPromise;
  const db = client.db("users-auth");
  const user = await db.collection("users").findOne({ email: "email.com" });

  console.log(user);
  res.status(200).json({ user });
}
