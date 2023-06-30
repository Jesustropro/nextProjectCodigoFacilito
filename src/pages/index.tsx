import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
    </>
  );
}

/* export async function getServerSideProps(context) {
  const data = await fetch(
    "https://api.quotable.io/quotes/random?limit=5"
  ).then((res) => {
    res.json().then((response) => {
      console.log(response);
    });
  });

  return {
    props: data,
  };
}
*/
