import { Card, Col, Text, Button, Row } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CardQuote({ quotes, categoryId, likedPost }: any) {
  const { data: session }: any = useSession();

  const { author, content, tags } = quotes;

  const liked = async (quotes: any, categoryId: any) => {
    try {
      const result = await fetch(
        `http://localhost:3000/api/auth/liked?id=${session?.user?._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotes, likes: session?.user?.likes }),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card css={{ mw: "330px", margin: 2, marginTop: 10 }}>
      <Card.Header>
        <Text b>
          {tags.length > 1
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
                <Button flat auto rounded color="error">
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                    onClick={() => {
                      liked(quotes, categoryId);
                    }}
                  >
                    Like
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
