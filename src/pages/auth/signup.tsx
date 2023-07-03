import { useState } from "react";
import { signIn } from "next-auth/react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import NavBar from "@/components/NavBar";
const SignUp = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const handlerSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Your passwords do not match, please try again.");
      setVisible(true);
      return;
    }

    try {
      const result = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, lastName, password }),
      });
      const response = await result.json();
      if (result.status === 200 && response.ok === false) {
        setError("User already exist.");
        setVisible(true);
      }
      if (response && result.status === 200 && response.ok !== false) {
        signIn();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <NavBar />
      <form onSubmit={handlerSubmitForm} style={{ marginTop: 40 }}>
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          labelPlaceholder="First name"
          value={name}
          size="lg"
        />

        <Input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          labelPlaceholder="LastName"
          value={lastName}
          size="lg"
        />

        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          labelPlaceholder="Email"
          value={email}
          size="lg"
        />

        <Input.Password
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          labelPlaceholder="Password"
          size="lg"
        />

        <Input.Password
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
          value={repeatPassword}
          labelPlaceholder="Repeat password"
          size="lg"
        />

        <button>Login</button>
      </form>

      {error && (
        <div>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text b id="modal-title" size={18}>
                Oh no, an error has occurred!
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Text size={18}>{error}</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onPress={closeHandler}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};
export default SignUp;
