import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import NextLink from "next/link";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const handlerSubmitForm = (e: { preventDefault: () => void }) => {
    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((e) => {
      if (e?.status === 200) {
        router.push("/");
      } else {
        setVisible(true);
        setError("Check your email and password");
      }
    });
  };
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "70vh",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handlerSubmitForm}>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            labelPlaceholder="Email"
            value={email}
            size="lg"
            type="email"
          />
          {"              "}
          <Input.Password
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            labelPlaceholder="Password"
            size="lg"
          />
          <Button
            style={{ display: "initial" }}
            auto
            color="secondary"
            rounded
            flat
            onClick={handlerSubmitForm}
          >
            Login
          </Button>
        </form>
        <span>
          If you do not have an account you can register{" "}
          <NextLink href="/auth/signup">here</NextLink>
        </span>
      </div>
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
                There is a problem logging in
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

export const getServerSideProps = async (context: { req: any }) => {
  const { req } = context;

  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return { props: {} };
};
export default Login;
