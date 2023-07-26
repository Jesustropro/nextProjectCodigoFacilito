import { useSession } from "next-auth/react";
import Card from "@/components/Card";
import { QuotesTypes } from "./index";
import { useState, useEffect } from "react";
export default function Favorites() {
  const { data: session, update, status }: any = useSession();
  const [likedQuotes, setLikedQuotes] = useState<QuotesTypes[]>([]);

  useEffect(() => {
    if (session) {
      const fetchQuotes = async () => {
        const res = await fetch(
          `/api/auth/createquote?name=${session.user.name}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              quotes: null,
            }),
          }
        );
        const data = await res.json();
        setLikedQuotes(data[0].likes);
      };
      fetchQuotes();
    }
  }, [session]);
  return (
    <>
      {session ? (
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
      ) : (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Login to see your favorites
        </h1>
      )}
    </>
  );
}
