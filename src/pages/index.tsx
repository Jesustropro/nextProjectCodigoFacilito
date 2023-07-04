import NavBar from "../components/NavBar";
import fetcher from "@/utils/fetcher";
import Card from "../components/Card";
import Link from "next/link";

export default function Home({ only5 }: any) {
  return (
    <>
      <NavBar />

      <h1
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Randoms Quotes
      </h1>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {only5.map((quotes: any) => {
          return <Card key={quotes._id} quotes={quotes} />;
        })}
      </div>
      <button>
        <Link style={{ color: "white" }} href={"/"}>
          Refresh
        </Link>
      </button>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const only5 = await fetcher(`?limit=5`);
    return {
      props: {
        only5,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
