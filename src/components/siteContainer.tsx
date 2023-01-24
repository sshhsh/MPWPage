import { List } from "antd";
import { observer } from "mobx-react-lite";
import { Site } from "../store/entity/site";
import { Store } from "../store/store";

type params = {
  sites: [string, Site][],
  store: Store,
}

export const SiteContainer = observer(({ sites, store }: params) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <List
        bordered
        dataSource={[...sites]}
        rowKey={(([key,]) => key)}
        renderItem={([, site]) => (
          <List.Item
            onClick={() => store.showSite(site)}>
            {site.site}
          </List.Item>
        )}
      />
    </div>
  );
});
