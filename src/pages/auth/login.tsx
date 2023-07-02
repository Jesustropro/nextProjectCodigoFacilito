import { Input } from "@nextui-org/react";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
    });
  };
  return (
    <>
      <form onSubmit={handlerSubmitForm}>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          labelPlaceholder="Correo electrónico"
          value={email}
          size="lg"
          type="email"
        />
        <Input.Password
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          labelPlaceholder="Password"
          size="lg"
        />
        <button>Login</button>
      </form>
    </>
  );
};

export const getServerSideProps = async (context: { req: any }) => {
  const { req } = context;

  const session = await getSession({ req });
  console.log(session, "session");
  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return { props: {} };
};
export default Login;
