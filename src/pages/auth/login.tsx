import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextLink from "next/link";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handlerSubmitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((e) => {
      if (e?.status === 200) {
        toast.success("Log In Correctly!", {
          theme: "dark",
          autoClose: 1000,
          pauseOnHover: false,
        });
        router.push("/");
      } else {
        setVisible(true);
        setError(
          "Have you created a user yet? if you already did it then check your email and password"
        );
      }
    });
  };
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <>
      <ToastContainer />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "4rem",
        }}
      >
        Log In
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "50vh",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handlerSubmitForm}>
          <div style={{ marginBottom: "2rem" }}>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              labelPlaceholder="Email"
              value={email}
              size="lg"
              type="email"
              required={true}
            />
          </div>
          {"              "}
          <div style={{ marginBottom: "2rem" }}>
            <Input.Password
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              labelPlaceholder="Password"
              size="lg"
              required={true}
            />
            <button style={{ marginLeft: "0.5rem" }}>Log In</button>
          </div>
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
