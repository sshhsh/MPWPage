import { Button, Input } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { User } from "../store/entity/user";

type params = {
  user: User,
}

export const SiteContainer = observer(({ user }: params) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
    {Array.from(user.sites.values()).map((site) => <div key={site.site}>
        {site.site}
    </div>)}
    </div>
  );
});
