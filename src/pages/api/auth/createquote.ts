import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const client = await clientPromise;
    const db = client.db("users-auth");
    const db2 = client.db("quotes");
    const { id, myquote, deleteQuote, creatorId, likesid } = req.query;

    const { quotes, myquotes } = req.body;

    const idString = id?.toString().trim();
    const myquotestring = myquote?.toString().trim();
    const creatorIdstring = creatorId?.toString().trim();
    const likesidstring = likesid?.toString().trim();
    // if likedquotes exist, return likes user which matches the id of likedquotes

    if (creatorId) {
      const user = await db
        .collection("users")
        .aggregate([{ $match: { _id: new ObjectId(creatorIdstring) } }])
        .toArray();
      res.status(200).json(user);
      return;
    }
    if (likesid) {
      const quotes = await db2
        .collection("quotes")
        .aggregate([{ $match: { _id: new ObjectId(likesidstring) } }])
        .toArray();
      res.status(200).json(quotes);
      return;
    }

    if (quotes !== null) {
      const post2 = await db2.collection("quotes").insertOne({
        author: quotes.author,
        tags: quotes.tags,
        content: quotes.content,
        likesCount: quotes.likesCount,
        creator: quotes.creator,
      });

      res.status(200).json({
        message: "success",
      });
      return;
    }
    if (deleteQuote) {
      //delete one quote with same id in colecction quotes
      const post2 = await db2.collection("quotes").deleteOne({
        _id: new ObjectId(deleteQuote.toString()),
      });
      return;
    }
    if (myquote) {
      const quotes = await db2
        .collection("quotes")
        .aggregate([{ $match: { creator: myquotestring } }])
        .toArray();
      res.status(200).json(quotes);
      return;
    }
  } catch (e) {
    console.error(e);
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
