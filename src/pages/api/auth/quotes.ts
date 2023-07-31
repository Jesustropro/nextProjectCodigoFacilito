import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
type Data = {};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { limit, tag, id, top, topAuthor, author, users } = req.query;
  const { quotes, countLikes } = req.body;

  if (countLikes) {
    try {
      const idString = id?.toString().trim();
      const client = await clientPromise;
      const db = client.db("quotes");
      const likesCount = quotes.likesCount;
      const quote = await db
        .collection("quotes")
        .updateOne(
          { _id: new ObjectId(idString) },
          { $set: { likesCount: likesCount + countLikes } }
        );

      res.status(200).json({ message: "ok" });
      return;
      // return to the front end the updated likesCount
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar likes" });
    }
  }
  // connvert limit to number
  const limitNum = Number(limit);
  const client = await clientPromise;

  const db = client.db("quotes");

  if (topAuthor && limit) {
    const quotes = await db
      .collection("quotes")
      .aggregate([
        { $unwind: "$author" },
        { $group: { _id: "$author", count: { $sum: "$likesCount" } } },
        { $sort: { count: -1 } },
        { $limit: limitNum },
      ])
      .toArray();
    res.status(200).json(quotes);
    return;
  }

  //if top exist filter quotes with have more likesCount
  if (top && limit) {
    const quotes = await db
      .collection("quotes")
      .find({})
      .sort({ likesCount: -1 })
      .limit(limitNum)
      .toArray();
    res.status(200).json(quotes);
    return;
  }

  // if users exist filter quotes with have property creator
  if (users) {
    const quotes = await db
      .collection("quotes")
      .find({ creator: { $exists: true } })
      .toArray();
    //sort array so that last are firts
    res.status(200).json(quotes.reverse());
    return;
  }

  if (author && limit) {
    //if author existe filter quotes with have the author and random

    const quotes = await db
      .collection("quotes")
      .aggregate([
        { $match: { author: author } },
        { $sample: { size: limitNum } },
      ])
      .toArray();
    res.status(200).json(quotes);
    return;
  }

  if (tag && limit) {
    const tags = tag.toString().split(",");
    const newQuotes = await db
      .collection("quotes")
      .aggregate([
        { $match: { tags: { $in: tags } } },
        { $sample: { size: limitNum } },
      ])
      .toArray();
    res.status(200).json(newQuotes);
    return;
  } else {
    const newQuotes = await db
      .collection("quotes")
      .aggregate([{ $sample: { size: limitNum } }])
      .toArray();
    res.status(200).json(newQuotes);
    return;
  }
}
