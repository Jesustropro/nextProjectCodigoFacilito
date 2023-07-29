import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { QuotesTypes } from "../index";
import Card from "@/components/Card";
export default function Profile() {
  const { data: session, update, status }: any = useSession();
  const [user, setUser] = useState<any>(null);
  const [quotes, setQuotes] = useState<any>(null);
  const {
    query: { id },
  } = useRouter();
  console.log(id);
  useEffect(() => {
    if (id) {
      const fetchQuotes = async () => {
        const res = await fetch(`/api/auth/createquote?creatorId=${id}`);
        const data = await res.json();
        console.log(data);
        setUser(data);
      };
      fetchQuotes();
    }
    if (id) {
      const fetchQuotes = async () => {
        const res = await fetch(`/api/auth/createquote?myquote=${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quotes: null,
          }),
        });
        const data = await res.json();
        setQuotes(data);
      };
      fetchQuotes();
    }
  }, [id]);

  return (
    <div>
      {user ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <section
              style={{
                display: "flex",
                flexWrap: "wrap",
                margin: "3rem",
                padding: "2rem",
                borderRadius: "3rem",
                width: "auto",
                maxWidth: "80%",
                minWidth: "50%",
                backgroundColor: "#16181A",
              }}
            >
              <img
                src={
                  user[0].url
                    ? user[0].url
                    : "https://paperboogie.com/wp-content/uploads/2020/11/como-ordeno-mis-libros-150x150.jpg"
                }
                alt="user"
                style={{
                  position: "relative",
                  width: "200px",
                  height: "200px",
                  borderRadius: "6rem",
                  border: "4px solid blue",
                  objectFit: "cover",
                  marginRight: "2rem",
                }}
              />
              <div>
                <h1 style={{ width: "100%", fontSize: "2rem" }}>
                  {user[0].name} {user[0].lastName}
                </h1>
                <div
                  style={{
                    wordBreak: "break-word",
                  }}
                >
                  {user[0].description ? (
                    <p>{user[0].description}</p>
                  ) : (
                    <p style={{ color: "gray" }}>User no have a description</p>
                  )}
                </div>
              </div>
            </section>
          </div>
          <section
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  marginBottom: "40px",
                }}
              >
                {quotes && quotes.length > 0
                  ? `Quotes of ${user[0].name} ${user[0].lastName}`
                  : `This user no have a quotes`}
              </h2>
              <div style={{}}>
                {quotes &&
                  quotes.map((quote: QuotesTypes) => {
                    return (
                      <Card
                        key={quote._id}
                        quotes={quote}
                        deleteQuote={false}
                        favorites={true}
                      />
                    );
                  })}
              </div>
            </div>
            <div>
              <h2
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  marginBottom: "40px",
                }}
              >
                {user[0].likes.length > 0
                  ? `Likes of ${user[0].name} ${user[0].lastName}`
                  : `This user no have a likes`}
              </h2>
              <div style={{}}>
                {user[0].likes.map((quote: QuotesTypes) => {
                  return (
                    <Card
                      key={quote._id}
                      quotes={quote}
                      deleteQuote={false}
                      favorites={true}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </>
      ) : (
        <div>Sign In to see users</div>
      )}
    </div>
  );
}
