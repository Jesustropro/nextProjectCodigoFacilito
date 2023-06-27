import { Input, Button } from "@nextui-org/react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmitForm = () => {};

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
        />
        <Input.Password
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          labelPlaceholder="Contraseña"
          size="lg"
        />

        <Button auto color="secondary" rounded flat>
          Login
        </Button>
      </form>
    </>
  );
};
export default Login;
