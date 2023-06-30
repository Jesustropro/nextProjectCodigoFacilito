import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/mongoConfig/mongodb";
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

    if (!user) {
      console.log("no existe ese usuario");
      res.status(400).json({ message: "user does not exist" });
      return;
    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        res.status(500).json({
          message: "something broke :(",
        });
        return;
      }
      if (result) {
        res.status(200).json({ message: "Done!", user });
      } else {
        res.status(500).json({
          message: "Incorrect password",
        });
        return;
      }
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
