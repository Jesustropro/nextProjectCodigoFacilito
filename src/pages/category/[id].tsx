import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import fetcher from "@/utils/fetcher";
import Card from "@/components/Card";
import Link from "next/link";
export default function Category({ category5 }: any) {
  const {
    query: { id },
  } = useRouter();
  const router = useRouter();

  const title = `${id}`?.charAt(0).toUpperCase() + id?.slice(1);

  return (
    <>
      <NavBar />
      <h1 style={{ display: "flex", justifyContent: "center" }}>{title}</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {category5.map((quotes: any) => {
          return <Card key={quotes.id} quotes={quotes} categoryId={id} />;
        })}
      </div>

      <button>
        <Link style={{ color: "white" }} href={`/category/${id}`}>
          Refresh
        </Link>
      </button>
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
