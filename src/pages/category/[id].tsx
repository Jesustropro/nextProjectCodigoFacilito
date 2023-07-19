import { useRouter } from "next/router";

import Card from "@/components/Card";

export default function Category({ category5 }: any) {
  const {
    query: { id },
  } = useRouter();

  const title = `${id}`?.charAt(0).toUpperCase() + id?.slice(1);

  return (
    <>
      <h1
        style={{ display: "flex", justifyContent: "center" }}
      >{`${title} Quotes`}</h1>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "80%",
          }}
        >
          {category5.map((quotes: any) => {
            return <Card key={quotes.id} quotes={quotes} deleteQuote={false} />;
          })}
        </div>
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
      `${process.env.NEXTAUTH_URL}/api/auth/quotes?limit=5&tag=${title}`
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
