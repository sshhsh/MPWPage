import { Button, Input } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { LoginState } from "../store/store";

type params = {
  user?: string;
  onLogin: (name: string, pass: string) => void;
  isLogin: LoginState;
};

export const Login = observer(({ user, onLogin, isLogin }: params) => {
  const [name, setName] = useState(user ?? "");
  const [pass, setPass] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Input
        placeholder="name"
        value={name}
        size="large"
        onChange={(v) => setName(v.target.value)}
        style={{
          margin: "10px",
          width: "auto",
        }}
      />
      <Input.Password
        placeholder="pass"
        size="large"
        onChange={(v) => setPass(v.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            onLogin(name, pass);
          }
        }}
        style={{
          margin: "10px",
          width: "auto",
        }}
      />
      <Button
        type="primary"
        size="large"
        disabled={name === "" || pass === "" || isLogin === LoginState.Loading}
        onClick={() => {
          onLogin(name, pass);
        }}
        style={{
          margin: "10px",
          width: "auto",
        }}
        loading={isLogin === LoginState.Loading}
      >
        Login
      </Button>
    </div>
  );
});
