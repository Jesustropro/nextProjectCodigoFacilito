import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function LikeButton({
  quotes,

  alreadyLike,
  countLikes,
  setAlreadyLike,
  setCountLikes,
}: any) {
  const { _id } = quotes;

  const { data: session, update }: any = useSession();

  const liked = async (quotes: any, { dislike }: any) => {
    if ((countLikes || countLikes === 0) && !dislike) {
      try {
        const result = await fetch(`/api/auth/quotes?id=${_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotes, countLikes: 1 }),
        });
        quotes.likesCount = quotes.likesCount + 1;
        setCountLikes(countLikes + 1);
      } catch (error) {
        console.error(error);
      }
    }

    const filteredLikes = session?.user?.likes.filter(
      (likes: any) => likes._id !== quotes._id
    );

    if (dislike) {
      try {
        update({
          user: {
            ...session?.user,
            change: true,
          },
        });
        if (countLikes && countLikes > 0) {
          setAlreadyLike(false);
          const result = await fetch(`/api/auth/quotes?id=${_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quotes, countLikes: -1 }),
          });
          quotes.likesCount = quotes.likesCount - 1;
          setCountLikes(countLikes - 1);
        }

        const result = await fetch(`/api/auth/liked?id=${session?.user?._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotes: null, likes: filteredLikes }),
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const result = await fetch(`/api/auth/liked?id=${session?.user?._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotes, likes: session?.user?.likes }),
        });

        setAlreadyLike(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <Image
        src={alreadyLike ? "/icons/dislike.svg" : "/icons/like.svg"}
        width={25}
        height={25}
        alt="icon like and dislike"
        style={{ cursor: "pointer" }}
        onClick={() => {
          alreadyLike
            ? liked(quotes, { dislike: true })
            : liked(quotes, { dislike: null });
        }}
      />

      <p
        style={{
          marginLeft: "10px",
          fontSize: "15px",

          fontWeight: "bold",
          fontFamily: "cursive",
        }}
      >
        {countLikes !== 0 && countLikes}
      </p>
    </>
  );
}
