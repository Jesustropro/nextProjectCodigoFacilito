import { useSession } from "next-auth/react";
import Card from "@/components/Card";
import { QuotesTypes } from "./index";
import { useState, useEffect } from "react";
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
        console.log(data);
        setLikedQuotes(data[0].likes);
        setLoading(false);
      };
      fetchQuotes();
    }
  }, [session]);
  return (
    <>
      {session && !loading ? (
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
                <Card
                  key={quote._id}
                  quotes={quote}
                  deleteQuote={false}
                  favorites={true}
                />
              );
            })}
          </div>
        </>
      ) : session && loading ? (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Loading...
        </h1>
      ) : (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Login to see your favorites
        </h1>
      )}
    </>
  );
}
