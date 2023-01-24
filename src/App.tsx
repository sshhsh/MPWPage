import React from "react";
import "antd/dist/antd.dark.css";
import { observer } from "mobx-react";
import { LoginState, Store } from "./store/store";
import { generate, login } from "./mpw";
import { Login } from "./components/login";
import { Logged } from "./components/logged";

const App = observer(({ store }: { store: Store }) => {
  if (store.isLogin === LoginState.LoggedIn) {
    return <Logged store={store} />;
  } else {
    return (
      <Login
        user={store.currentUser}
        onLogin={async (name, password) => {
          store.startLogin();
          await login({ name, password });
          store.login(name);
        }}
        isLogin={store.isLogin}
      ></Login>
    );
  }
});
export default App;
