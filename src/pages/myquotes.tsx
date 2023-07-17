import { Modal, Button, Text, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Card from "@/components/Card";
import { QuotesTypes } from "./index";

export default function MyQuotes() {
  const { data: session, update, status }: any = useSession();
  const [visible, setVisible] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const handler = () => setVisible(true);

  const saveQuote = async () => {
    console.log(session);
    if (author.length > 0 && tags.length > 0 && quote.length > 0) {
      try {
        const result = await fetch(
          `/api/auth/createquote?id=${session?.user?._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              quotes: {
                author,
                tags: [tags],
                content: quote,
                _id: author + tags + quote,
              },
              myquotes: session?.user?.myquotes,
            }),
          }
        );

        await update({
          ...session,
          user: {
            ...session?.user,
            myquotes: [
              ...session.user.myquotes,
              {
                author,
                tags: [tags],
                content: quote,
                _id: author + tags + quote,
              },
            ],
          },
        });
        //     updateSession({ deleteLike: null });
        //   setAlreadyLike(true);
      } catch (error) {
        console.error(error);
      }
      setVisible(false);
      setAuthor("");
      setTags("");
      setQuote("");
    }
  };

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        {session ? "My Quotes" : "Log in to see your quotes"}
      </h1>
      {session && (
        <div
          style={{
            display: "flex",
            justifyContent: "end",

            width: "90%",
          }}
        >
          <Button color="secondary" rounded flat auto onPress={handler}>
            Create a new quote
          </Button>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={saveQuote}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Write a{" "}
                <Text b size={18}>
                  Quote
                </Text>
              </Text>
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginTop: "15px" }}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="secondary"
                  size="lg"
                  labelPlaceholder="Category"
                  onChange={(e) => setTags(e.target.value)}
                  value={tags}
                />
              </div>
              <div style={{ marginTop: "17px" }}>
                <Input
                  color="secondary"
                  clearable
                  bordered
                  fullWidth
                  size="lg"
                  labelPlaceholder="Author"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                />
              </div>
              <Textarea
                color="secondary"
                bordered
                label="Write your thoughts"
                placeholder="Enter your amazing ideas."
                onChange={(e) => setQuote(e.target.value)}
                value={quote}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onPress={() => setVisible(false)}>
                Close
              </Button>
              <Button auto color="secondary" onPress={saveQuote}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      {session?.user?.myquotes?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {session?.user?.myquotes.map((quote: QuotesTypes) => {
            return <Card key={quote._id} quotes={quote} />;
          })}
        </div>
      )}
    </>
  );
}
