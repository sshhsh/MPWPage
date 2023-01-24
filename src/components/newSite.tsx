import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber, Select, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { generate, PassParams, Template } from "../mpw";
import { Site } from "../store/entity/site";
import { User } from "../store/entity/user";

type params = {
  user: User;
  initSite: Site;
};

export const NewSite = observer(({ user, initSite }: params) => {
  const pass = generate(initSite);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        <Input
          size="large"
          style={{
            flexBasis: "0",
            flexGrow: 1,
            margin: "10px",
          }}
          value={initSite.site}
          onChange={(e) => initSite.setSite(e.target.value)}
        />
        <Select
          size="large"
          style={{
            flexBasis: "60px",
            margin: "10px",
          }}
          value={initSite.template}
          onChange={(e) => initSite.setTemplate(e)}
        >
          {Object.keys(Template).map((str) => (
            <Select.Option key={str}>{str}</Select.Option>
          ))}
        </Select>
        <InputNumber
          size="large"
          value={initSite.counter}
          onChange={(n) => initSite.setCounter(Math.max(1, n ?? 1))}
          style={{
            flexBasis: "40px",
            margin: "10px",
          }}
        />
        {new Map(user.sites).has(initSite.toString()) ? (
          <Button
            type="primary"
            danger
            icon={<PlusOutlined />}
            onClick={() => {
              user.deleteSite(initSite);
            }}
          />
        ) : (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={initSite.site === ""}
            onClick={() => {
              user.addSite(initSite);
            }}
          />
        )}
      </div>
      <div
        style={{
          flexShrink: 1,
          margin: "10px",
          height: "40px",
          fontSize: "30px",
          fontWeight: "600",
        }}
        onClick={() => {
          // user.addSite(initSite);
        }}
      >
        {pass}
      </div>
    </div>
  );
});
