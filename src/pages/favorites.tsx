import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import Card from "@/components/Card";

export default function Favorites() {
  const { data: session } = useSession();

  return (
    <>
      <NavBar />
      <h1>Favorites</h1>
      {session?.user?.likes.map((quote: any) => {
        return <Card key={quote._id} quotes={quote} />;
      })}
    </>
  );
}
