import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Card from "@/components/Card";

export default function Category({ category5 }: any) {
  const {
    query: { id },
  } = useRouter();
  const router = useRouter();
  const [quotes, setQuotes] = useState(category5);
  const [reload, setReload] = useState(false);
  const [initialId, setInitialId] = useState<any>("");

  const refresh = () => {
    sessionStorage.removeItem("category5");
    window.scrollTo(0, 0);
    setReload(true);
    router.push(`/category/${id}`, undefined, { scroll: false });
  };

  useEffect(() => {
    console.log("a");
    setInitialId(id);
    if (initialId == id) {
      const local = sessionStorage.getItem("category5");
      if (local) {
        setQuotes(JSON.parse(local));
      } else {
        sessionStorage.setItem("category5", JSON.stringify(category5));
        setQuotes(category5);
        setReload(false);
      }
    } else {
      refresh();
    }
  }, [category5, reload, id]);

  const title = `${id}`?.charAt(0).toUpperCase() + id?.slice(1);

  return (
    <>
      <h1
        style={{ display: "flex", justifyContent: "center" }}
      >{`${title} Quotes`}</h1>{" "}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "80%",
            gap: "1rem",
          }}
        >
          {quotes.map((quotes: any) => {
            return (
              <Card key={quotes._id} quotes={quotes} deleteQuote={false} />
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "5vh",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Button onClick={refresh} shadow color="secondary" auto>
          Refresh
        </Button>
      </div>
    </>
  );
}
export async function getServerSideProps(context: any) {
  try {
    const title =
      `${context.query.id}`?.charAt(0).toUpperCase() +
      context.query.id?.slice(1);

    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/quotes?limit=5&${
        title === "Users" ? "users" : "tag"
      }=${title}`
    );
    const category5 = await res.json();

    return {
      props: {
        category5,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
