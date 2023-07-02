import NavBar from "../components/NavBar";
import fetcher from "@/utils/fetcher";
import Card from "../components/Card";
import { useRouter } from "next/router";
export default function Home({ only5 }: any) {
  const router = useRouter();
  return (
    <>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {only5.map((quotes: any) => {
          return <Card key={quotes._id} quotes={quotes} />;
        })}
      </div>
      <button
        onClick={() => {
          router.push(`/`);
        }}
      >
        refresh
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
