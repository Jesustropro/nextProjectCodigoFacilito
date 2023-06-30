import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { replace } = useRouter();

  const handlerSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      console.log("contraseñas no coinciden");
      return;
    }

    try {
      const result = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, lastName, password }),
      });
      const response = await result.json();

      if (response && result.status === 200) {
        replace("/auth/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handlerSubmitForm}>
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
  );
};
export default SignUp;
