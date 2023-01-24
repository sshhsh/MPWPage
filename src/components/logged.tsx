import { Button, Input, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { Store } from "../store/store";
import { NewSite } from "./newSite";
import { SiteContainer } from "./siteContainer";

const { Title } = Typography;

type params = {
  store: Store;
};

export const Logged = observer(({ store }: params) => {
  const user = new Map(store.users).get(store.currentUser ?? '');
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title>{store.currentUser}</Title>
        <Button
          danger
          onClick={() => {
            store.logout();
          }}
        >
          Logout
        </Button>
      </div>
      {user && <NewSite user={user} initSite={store.currentSite}/>}
      {user && <SiteContainer sites={user.sites} store={store}/>}
    </div>
  );
});
