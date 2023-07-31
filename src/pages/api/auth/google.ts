import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "only POST method" });
  }
  if (
    typeof req.body !== "object" ||
    req.body === null ||
    req.body === undefined
  ) {
    res.status(400).json({ message: "send a body" });
    return;
  }

  try {
    const { email } = req.body;

    const client = await clientPromise;

    const db = client.db("users-auth");

    const user = await db.collection("users").findOne({ email: email });

    if (!user) {
      return res
        .status(200)
        .json({ message: "user does not exist", ok: false });
    } else {
      const usermdb = await db
        .collection("users")
        .aggregate([{ $match: { email: email } }])
        .toArray();
      return res.status(200).json({
        usermdb,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "something broke :(",
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
