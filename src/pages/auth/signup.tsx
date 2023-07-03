import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import NavBar from "@/components/NavBar";
const SignUp = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handlerSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      console.log("contraseñas no coinciden");
      return;
    }

    try {
      const result = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, lastName, password }),
      });
      const response = await result.json();

      if (response && result.status === 200) {
        signIn();
      }
    } catch (error) {
      console.error(error);
    }
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
    </>
  );
};
export default SignUp;
