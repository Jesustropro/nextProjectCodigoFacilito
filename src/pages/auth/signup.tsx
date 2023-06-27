import { Input, Button } from "@nextui-org/react";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const handlerSubmitForm = () => {};
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

      <Button auto color="secondary" rounded flat>
        Login
      </Button>
    </form>
  );
};
export default SignUp;
