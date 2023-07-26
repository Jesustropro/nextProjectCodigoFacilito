import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { id, url, creator, description } = req.query;
    const client = await clientPromise;
    const db = client.db("users-auth");
    const idString = id?.toString().trim();
    if (id && url) {
      const post = await db.collection("users").updateOne(
        { _id: new ObjectId(idString) },
        {
          $set: {
            url: url,
          },
        }
      );
      res.status(200).json({
        message: "success",
      });
      return;
    }
    if (id && description) {
      const post = await db.collection("users").updateOne(
        { _id: new ObjectId(idString) },
        {
          $set: {
            description: description,
          },
        }
      );
      res.status(200).json({
        message: "success",
      });
      return;
    }
    if (creator) {
      const users = await db
        .collection("users")
        .find({ name: creator })
        .toArray();
      res.status(200).json({
        users,
      });
      return;
    }
  } catch (e) {
    console.log(e);
  }
}
