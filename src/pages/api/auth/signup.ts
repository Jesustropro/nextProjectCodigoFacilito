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
    const { email, password } = req.body;

    const client = await clientPromise;
    const db = client.db("users-auth");
    const user = await db.collection("users").findOne({ email: email });
    if (user) {
      res.status(400).json({ message: "user already exist" });
      return;
    }
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        res.status(500).json({
          message: "something broke :(",
        });
        return;
      }
      bcrypt.hash(password, salt, async (errorHashing, passwordHashing) => {
        if (errorHashing) {
          res.status(500).json({
            message: "error in the hash :(",
          });
          return;
        }
        const newUser = await db.collection("users").insertOne({
          ...req.body,
          email,
          password: passwordHashing,
          likes: [],
        });
        res.status(200).json({ message: "Done!", newUser });
      });
    });
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
