import { useState } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
const Cover = dynamic(() => import('./cover'));
const Posts = dynamic(() => import('./posts'));
const Members = dynamic(() => import('./members'));
import { useGroup } from "./hooks/use-group";

const tabs = [
  { component: <Posts />, name: "Posts", value: "posts" },
  { component: <Members />, name: "Members", value: "members" },
];

const Group = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const handleChangeTab = (_, tab) => setActiveTab(tab);

  const group = useGroup();

  return (
    <Box sx={{ width: "100%" }}>
      <Cover
        activeTab={activeTab}
        onChangeTab={handleChangeTab}
        name={group.data?.name}
        category={group?.data?.category?.name}
        cover={group?.data?.cover}
      />
      {tabs.map((tab) => tab.value === activeTab && <div key={tab.value}> {tab.component} </div>)}
    </Box>
  );
};

export default Group;
