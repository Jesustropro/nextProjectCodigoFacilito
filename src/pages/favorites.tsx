import { useSession } from "next-auth/react";
import Card from "@/components/Card";
import { QuotesTypes } from "./index";
import { useState, useEffect } from "react";
import { Loading } from "@nextui-org/react";
export default function Favorites() {
  const { data: session, update, status }: any = useSession();
  const [likedQuotes, setLikedQuotes] = useState<QuotesTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (session) {
      const fetchQuotes = async () => {
        const res = await fetch(
          `/api/auth/createquote?creatorId=${session.user._id}`
        );
        const data = await res.json();
        const userId = data[0].likes.map(async (user: any) => {
          const resp = await fetch(`/api/auth/createquote?likesid=${user._id}`);
          const likesUser = await resp.json();
          return likesUser;
        });

        const userIdResolved = await Promise.all(userId);
        const likesUserTotal: any = [];
        userIdResolved.map((user: any) => {
          likesUserTotal.push(...user);
        });

        setLikedQuotes(likesUserTotal);
        setLoading(false);
      };
      fetchQuotes();
    }
  }, [session]);
  return (
    <>
      {session && likedQuotes.length >= 1 ? (
        <>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Favorites
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {likedQuotes.map((quote: QuotesTypes) => {
              return (
                <Card key={quote._id} quotes={quote} deleteQuote={false} />
              );
            })}
          </div>
        </>
      ) : session && loading && likedQuotes.length <= 1 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Loading color={"secondary"} size="xl" />
        </div>
      ) : (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Login to see your favorites
        </h1>
      )}
    </>
  );
}
