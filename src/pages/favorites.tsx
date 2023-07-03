import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import Card from "@/components/Card";

export default function Favorites() {
  const { data: session, update, status }: any = useSession();

  return (
    <>
      <NavBar />

      {session ? (
        <>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Favorites
          </h1>
          <button
            onClick={() => {
              update();
            }}
          >
            Refresh
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {session?.user?.likes.map((quote: any) => {
              return <Card key={quote._id} quotes={quote} likedPost={true} />;
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
