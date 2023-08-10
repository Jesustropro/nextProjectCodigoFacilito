import { Card, Col, Text, Row, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ShareQuoteImageModal from "./ShareQuoteImageModal";
import LikeButton from "./LikeButton";
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

  setDeleteQuote?: (value: boolean) => void;
}
export default function CardQuote({
  quotes,
  deleteQuote,
  setDeleteQuote,
}: QuoteParams) {
  const { author, content, tags, likesCount, _id, creator } = quotes;
  const [visibleDownload, setVisibleDownload] = useState<boolean>(false);

  const [quotesLiked, setQuotesLiked] = useState<any>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { data: session }: any = useSession();
  const [alreadyLike, setAlreadyLike] = useState(false);
  const [countLikes, setCountLikes] = useState(likesCount);

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
    if (quotesLiked[0]) {
      if (
        quotesLiked[0].likes.find(
          (quoteLiked: { _id: string }) => quoteLiked._id === quotes._id
        )
      ) {
        return setAlreadyLike(true), setCountLikes(likesCount);
      } else {
        return setAlreadyLike(false), setCountLikes(likesCount);
      }
    }
  }, [quotesLiked]);

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

  const textToCopy = `"${content}" 
${author}`;

  return (
    <>
      <ShareQuoteImageModal
        quotes={quotes}
        setVisibleDownload={setVisibleDownload}
        visibleDownload={visibleDownload}
      />

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
                  <LikeButton
                    quotes={quotes}
                    alreadyLike={alreadyLike}
                    setAlreadyLike={setAlreadyLike}
                    countLikes={countLikes}
                    setCountLikes={setCountLikes}
                  />
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
                    onClick={() => setVisibleDownload(true)}
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
