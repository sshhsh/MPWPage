import { Input, InputNumber, Select, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { generate, PassParams, Template } from "../mpw";
import { User } from "../store/entity/user";

type params = {
  user: User,
}

export const NewSite = observer(({ user }: params) => {
  const [site, setSite] = useState('')
  const [counter, setCounter] = useState(1)
  const [template, setTemplate] = useState(Template.long)
  const pass = useMemo(()=>{
    if (site === '') {
      return '';
    }
    return generate({ site, counter, template });
  }, [site, counter, template]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch"
        }}
      >
        <Input
          size="large"
          style={{
            flexBasis: '60vw',
            margin: "10px",
          }}
          value={site}
          onChange={ e => setSite(e.target.value)}
        />
        <Select
          size="large"
          style={{
            flexBasis: '20vw',
            margin: "10px",
          }}
          value={template}
          onChange={(e) => setTemplate(e)}
        >
            {Object.keys(Template).map((str) => <Select.Option key={str}>{str}</Select.Option>)}
        </Select>
        <InputNumber size="large"
          value={counter}
          onChange={ n => setCounter(Math.max(1, n))}
          style={{
            flexBasis: '20vw',
            margin: "10px",
          }}/>
      </div>
      <Typography.Title
          style={{
            flexShrink: 1,
            margin: "10px",
          }}
          onClick={()=>{
            user.addSite({ site, counter, template });
          }}
          >{pass}</Typography.Title>
    </div>
  );
});
