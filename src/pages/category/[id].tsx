import { useRouter } from "next/router";
import fetcher from "@/utils/fetcher";
import Card from "@/components/Card";
import Link from "next/link";
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
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {category5.map((quotes: any) => {
          return <Card key={quotes.id} quotes={quotes} />;
        })}
      </div>
    </>
  );
}
export async function getServerSideProps(context: any) {
  try {
    const category5 = await fetcher(`?limit=5&tags=${context.query.id}`);
    return {
      props: {
        category5,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
