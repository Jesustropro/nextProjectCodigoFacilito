import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { QuotesTypes } from "../index";
import Card from "@/components/Card";
export default function Profile() {
  const { data: session, update, status }: any = useSession();
  const [user, setUser] = useState<any>(null);
  const [quotes, setQuotes] = useState<any>(null);
  const [likes, setLikes] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    setLoading(true);
    if (id) {
      const fetchQuotes = async () => {
        const res = await fetch(`/api/auth/createquote?creatorId=${id}`);
        const data = await res.json();
        setUser(data);
      };
      fetchQuotes();
      const fetchQuotesLikes = async () => {
        const res = await fetch(`/api/auth/createquote?creatorId=${id}`);
        const data = await res.json();
        const userId = data[0].likes.map(async (user: any) => {
          const resp = await fetch(`/api/auth/createquote?likesid=${user._id}`);
          const likesUser = await resp.json();
          return likesUser;
        });
        // resolve promise userId
        const userIdResolved = await Promise.all(userId);
        const likesUserTotal: any = [];
        userIdResolved.map((user: any) => {
          likesUserTotal.push(...user);
        });

        console.log(likesUserTotal);

        setLikes(likesUserTotal);
        setLoading(false);
      };
      fetchQuotesLikes();
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
        setLoading(false);
        setQuotes(data);
      };
      fetchQuotes();
    }
  }, [id]);

  return (
    <div>
      {user && !loading ? (
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
                {likes && likes.length > 0
                  ? `Likes of ${user[0].name} ${user[0].lastName}`
                  : `This user no have a likes`}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {likes &&
                  likes.map((quote: QuotesTypes) => {
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
      ) : session && loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>Sign In to see users</div>
      )}
    </div>
  );
}
