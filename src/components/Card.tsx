import { Card, Col, Text, Button, Row } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import { useState } from "react";

export default function CardQuote({ quotes, likedPost }: any) {
  const { data: session, update }: any = useSession();
  const [alreadyLike, setAlreadyLike] = useState(false);
  const { author, content, tags } = quotes;

  const liked = async (quotes: any, { dislike }: any) => {
    const filteredLikes = session?.user?.likes.filter(
      (likes: any) => likes._id !== quotes._id
    );

    async function updateSession({ deleteLike }: any) {
      if (deleteLike === null) {
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
        const result = await fetch(`/api/auth/liked?id=${session?.user?._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotes, likes: session?.user?.likes }),
        });
        updateSession({ deleteLike: null });
        setAlreadyLike(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Card css={{ mw: "330px", margin: 2, marginTop: 10 }}>
      <Card.Header>
        <Text b>
          {tags?.length > 1
            ? tags.map((tag: any) => {
                return `  ${tag}  `;
              })
            : tags[0]}
        </Text>
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
          {session && !likedPost && (
            <Col>
              <Row justify="flex-end">
                <Button
                  flat
                  auto
                  rounded
                  color={"error"}
                  disabled={alreadyLike ? true : false}
                  onClick={() => {
                    liked(quotes, { dislike: null });
                  }}
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    {alreadyLike ? "Liked" : "Like"}
                  </Text>
                </Button>
              </Row>
            </Col>
          )}

          {likedPost && (
            <Col>
              <Row justify="flex-end">
                <Button
                  flat
                  auto
                  rounded
                  color={"secondary"}
                  onClick={() => {
                    liked(quotes, { dislike: true });
                  }}
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Dislike
                  </Text>
                </Button>
              </Row>
            </Col>
          )}
        </Row>
      </Card.Footer>
    </Card>
  );
}
