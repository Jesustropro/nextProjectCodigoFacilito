import { Card, Col, Text, Row, Modal, Button, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import style from "./card.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

interface QuoteParams {
  quotes: {
    _id: string;
    author: string;
    content: string;
    tags: string[];
    likesCount?: number;
    creator?: string;
  };
  deleteQuote: boolean;
  favorites?: boolean;
  setDeleteQuote?: (value: boolean) => void;
}
export default function CardQuote({
  quotes,
  deleteQuote,
  setDeleteQuote,
  favorites,
}: QuoteParams) {
  const [visibleDownload, setVisibleDownload] = useState<boolean>(false);
  const handler = () => setVisibleDownload(true);
  const [colorShareCard, setColorSharedCard] = useState("white");
  const [fontColorSharedCard, setFontColorSharedCard] = useState("black");
  const menuSelectColorSharedCard = ["#6050DC", "#E48400", "#CDE1F3"];
  const [quotesLiked, setQuotesLiked] = useState<any>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { data: session, update }: any = useSession();
  const [alreadyLike, setAlreadyLike] = useState(false);

  const { author, content, tags, likesCount, _id, creator } = quotes;
  const [countLikes, setCountLikes] = useState(likesCount);

  const [windowSize, setWindowSize] = useState<any>(0);

  useEffect(() => {
    setWindowSize(window.innerWidth);
    console.log(windowSize);
  }, [windowSize]);
  const exportImage = async ({ share }: any) => {
    return html2canvas(document.getElementById(`${quotes._id}`)!).then(
      async (canvas) => {
        if (share) {
          const blob = await fetch(canvas.toDataURL()).then((r) => r.blob());

          const filesArray = [
            new File([blob], `${author}-${tags[0]}.png`, {
              type: "image/png",
            }),
          ];

          const data = {
            files: filesArray,
            url: "https://next-project-codigo-facilito.vercel.app/",
          };
          console.log(data, filesArray);

          if (navigator.canShare && navigator.canShare(data)) {
            await navigator.share(data);
          }
          return;
        }
        const link = document.createElement("a");

        link.download = `${author}-${tags[0]}.png`;

        link.href = canvas.toDataURL();
        link.click();
      }
    );
  };

  useEffect(() => {
    if (creator) {
      const getAuthor = async () => {
        const response = await fetch(`/api/auth/users?creator=${creator}`);
        const data = await response.json();
        setUserProfile(data);
      };

      getAuthor();
    }
  }, [creator]);
  useEffect(() => {
    if (session) {
      const fetchQuotes = async () => {
        const res = await fetch(
          `/api/auth/createquote?creatorId=${session.user._id}`
        );
        const data = await res.json();
        setQuotesLiked(data);
      };
      fetchQuotes();
    }
  }, [session]);

  useEffect(() => {
    if (
      quotesLiked[0]?.likes.find(
        (quoteLiked: { _id: string }) => quoteLiked._id === quotes._id
      )
    ) {
      return setAlreadyLike(true), setCountLikes(likesCount);
    }

    return setAlreadyLike(false), setCountLikes(likesCount);
  }, [quotes, session, likesCount, quotesLiked]);

  const deleteMyQuote = async () => {
    try {
      setDeleteQuote && setDeleteQuote(false);

      const result = await fetch(
        `/api/auth/createquote?deleteQuote=${quotes._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quotes: null,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const liked = async (quotes: any, { dislike }: any) => {
    if ((countLikes || countLikes === 0) && !dislike) {
      setCountLikes(countLikes + 1);
      //update likescount
      try {
        const result = await fetch(`/api/auth/quotes?id=${_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotes, countLikes: 1 }),
        });
        quotes.likesCount = quotes.likesCount + 1;
      } catch (error) {
        console.error(error);
      }
    }

    const filteredLikes = session?.user?.likes.filter(
      (likes: any) => likes._id !== quotes._id
    );

    async function updateSession({ deleteLike }: any) {
      if (!deleteLike) {
        await update({
          ...session,
          user: {
            ...session?.user,
            likes: [...session.user.likes, quotes],
          },
        });
      } else {
        await update({
          ...session,
          user: {
            ...session?.user,
            likes: [...filteredLikes],
          },
        });
      }
    }
    if (dislike) {
      try {
        if (countLikes && countLikes > 0) {
          setCountLikes(countLikes - 1);
          setAlreadyLike(false);
          const result = await fetch(`/api/auth/quotes?id=${_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quotes, countLikes: -1 }),
          });
          quotes.likesCount = quotes.likesCount - 1;
        }

        const result = await fetch(`/api/auth/liked?id=${session?.user?._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotes: null, likes: filteredLikes }),
        });
        updateSession({ deleteLike: true });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        setAlreadyLike(true);
        const result = await fetch(`/api/auth/liked?id=${session?.user?._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotes, likes: session?.user?.likes }),
        });
        updateSession({ deleteLike: null });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const textToCopy = `"${content}" 
${author}`;

  return (
    <>
      <Modal
        blur
        aria-labelledby="modal-title"
        open={visibleDownload}
        onClose={() => setVisibleDownload(false)}
      >
        <Modal.Body>
          <section
            style={{
              backgroundColor: colorShareCard,
              borderRadius: "20px",
            }}
          >
            <div
              id={quotes._id}
              style={{
                marginTop: "1rem",
                paddingTop: "0.5rem",
                backgroundColor: colorShareCard,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  margin: "15px",
                  color: fontColorSharedCard,
                }}
              >
                {author}
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  margin: "2rem",
                  color: fontColorSharedCard,
                }}
              >
                {content}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  margin: "1rem",
                  padding: "1rem",
                  fontFamily: "cursive",
                  color: fontColorSharedCard,
                }}
              >
                YouReadIt?
              </div>
            </div>
          </section>
        </Modal.Body>
        <section style={{ display: "flex", justifyContent: "space-evenly" }}>
          {menuSelectColorSharedCard.map((color, index) => {
            return (
              <button
                key={index}
                style={{
                  borderRadius: 50,
                  width: "2rem",
                  height: "2rem",
                  backgroundColor: `${color}`,
                  border: "none",

                  cursor: "pointer",
                }}
                onClick={() => setColorSharedCard(color)}
              />
            );
          })}
          <input
            className={style.inputColor}
            type="color"
            onChange={(event) => {
              setColorSharedCard(event.target.value);
            }}
          />
          <button
            style={{
              borderRadius: 5,
              width: "2rem",
              height: "2rem",
              backgroundColor: "white",
              border: "none",

              cursor: "pointer",
              color: "black",
              fontWeight: "bold",
              fontFamily: "cursive",
              fontSize: "20px",
            }}
            onClick={() => setFontColorSharedCard("black")}
          >
            A
          </button>
          <button
            style={{
              borderRadius: 5,
              width: "2rem",
              height: "2rem",
              backgroundColor: "black",
              border: "none",

              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
              fontFamily: "cursive",
              fontSize: "20px",
            }}
            onClick={() => setFontColorSharedCard("white")}
          >
            A
          </button>
        </section>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={() => setVisibleDownload(false)}
          >
            Close
          </Button>
          {windowSize > 960 ? (
            <Button
              auto
              color="secondary"
              onPress={() => {
                setVisibleDownload(false);
                exportImage({ share: null });
              }}
            >
              Download
            </Button>
          ) : (
            <Button
              auto
              color="secondary"
              onPress={() => {
                setVisibleDownload(false);
                exportImage({ share: true });
              }}
            >
              Share
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Card css={{ mw: "330px", margin: 2, marginTop: 10 }}>
        <Card.Header>
          {quotes.creator && (
            <Link key={_id} href={`/profile/${quotes.creator}`}>
              <User
                bordered
                name=""
                pointer
                src={
                  userProfile && userProfile.users[0]?.url
                    ? userProfile.users[0].url
                    : "https://paperboogie.com/wp-content/uploads/2020/11/como-ordeno-mis-libros-150x150.jpg"
                }
                color="secondary"
              />
            </Link>
          )}
          <Text b style={{ width: quotes.creator ? "60%" : "100%" }}>
            {tags?.length > 1
              ? tags.map((tag: any) => {
                  return `  ${tag}  `;
                })
              : tags[0]}
          </Text>
          {session && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {!deleteQuote && (
                <>
                  <Image
                    src={alreadyLike ? "/icons/dislike.svg" : "/icons/like.svg"}
                    width={25}
                    height={25}
                    alt="icon like and dislike"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      alreadyLike
                        ? liked(quotes, { dislike: true })
                        : liked(quotes, { dislike: null });
                    }}
                  />
                  {!favorites && (
                    <p
                      style={{
                        marginLeft: "10px",
                        fontSize: "15px",
                        color: "#fff",
                        fontWeight: "bold",
                        fontFamily: "cursive",
                      }}
                    >
                      {countLikes !== 0 && countLikes}
                    </p>
                  )}
                </>
              )}
              {deleteQuote && (
                <Image
                  src={"/icons/trash.svg"}
                  width={25}
                  height={25}
                  alt="delete quote"
                  style={{ cursor: "pointer" }}
                  onClick={deleteMyQuote}
                />
              )}
            </div>
          )}
        </Card.Header>

        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <Text>{content}</Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer
          isBlurred
          css={{
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$light solid $gray800",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Text color="#fff" size={16}>
                {author}
              </Text>
            </Col>
            {session && !deleteQuote && (
              <Col>
                <Row justify="flex-end">
                  <Image
                    onClick={handler}
                    src="/icons/download.svg"
                    width={25}
                    height={24}
                    alt="Copy to Clipboard"
                    style={{ cursor: "pointer" }}
                  />
                  <Image
                    src="/icons/copyToClipBoard.svg"
                    width={25}
                    height={25}
                    alt="Copy to Clipboard"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigator.clipboard.writeText(textToCopy);
                      toast.info("Copied to your clipboard!", {
                        theme: "dark",
                        autoClose: 1000,
                        pauseOnHover: false,
                      });
                    }}
                  />
                  <a
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?text=${textToCopy}`}
                  >
                    <Image
                      src="/icons/twitter.svg"
                      width={25}
                      height={25}
                      alt="icon Copy to Clipboard"
                      style={{ cursor: "pointer", marginLeft: 4 }}
                    />
                  </a>
                </Row>
              </Col>
            )}
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
}
