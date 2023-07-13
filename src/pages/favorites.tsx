import { useSession } from "next-auth/react";
import Card from "@/components/Card";
import { QuotesTypes } from "./index";

export default function Favorites() {
  const { data: session, update, status }: any = useSession();

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
            {session?.user?.likes.map((quote: QuotesTypes) => {
              return <Card key={quote._id} quotes={quote} />;
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
