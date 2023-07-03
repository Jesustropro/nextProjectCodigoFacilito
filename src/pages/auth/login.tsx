import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import NavBar from "@/components/NavBar";
import NextLink from "next/link";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmitForm = (e: { preventDefault: () => void }) => {
    signIn("credentials", {
      email,
      password,
    });
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
