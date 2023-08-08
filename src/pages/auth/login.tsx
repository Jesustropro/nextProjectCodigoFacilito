import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextLink from "next/link";
import { useTheme } from "next-themes";
const Login = () => {
  const { theme } = useTheme();

  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handlerSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
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
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          height: "80vh",
          alignItems: "center",
        }}
      >
        {" "}
        <div
          style={{
            borderRadius: "3rem",
            width: "auto",
            maxWidth: "95%",
            height: "auto",
            minHeight: "50%",
            backgroundColor: theme === "light" ? "#C8AE7D" : "#16181A ",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <h1
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            Log In
          </h1>
          <form
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
            onSubmit={handlerSubmitForm}
          >
            <div style={{ marginBottom: "2rem" }}>
              <Input
                bordered
                color="secondary"
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
                bordered
                color="secondary"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                labelPlaceholder="Password"
                size="lg"
                required={true}
              />
            </div>
            <Button type="submit" auto color="secondary">
              Sign In
            </Button>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <button
              style={{
                background: "transparent",
                border: "none",
              }}
              onClick={() => signIn("google")}
            >
              <img
                style={{
                  width: "3rem",
                  height: "3rem",

                  background: "transparent",
                  cursor: "pointer",
                }}
                src="/icons/google.svg"
                alt="google"
              />
            </button>
          </div>
          <span>
            If you do not have an account you can register{" "}
            <NextLink
              href="/auth/signup"
              style={{ fontFamily: "Roboto", fontWeight: "bold" }}
            >
              here
            </NextLink>
          </span>
        </div>
      </section>

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
