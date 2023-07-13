import { Modal, Button, Text, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function MyQuotes() {
  const { data: session, update, status }: any = useSession();
  const [visible, setVisible] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const handler = () => setVisible(true);

  const saveQuote = () => {
    if (author.length > 0 && category.length > 0 && quote.length > 0) {
      const quoteUser = {
        author,
        category,
        quote,
        _id: author + category + quote,
      };
      console.log(quoteUser);
      setVisible(false);
      setAuthor("");
      setCategory("");
      setQuote("");
    }
  };

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>My Quotes</h1>

      <div>
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
                onChange={(e) => setCategory(e.target.value)}
                value={category}
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
    </>
  );
}
