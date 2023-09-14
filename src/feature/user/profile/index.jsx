import { useState } from "react";
import { Box, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import dynamic from "next/dynamic";
const General = dynamic(() => import('./general'));
const Billing = dynamic(() => import('./billing'));

const tabs = [
  {
    value: "profile",
    label: "Profile",
    component: <General />,
  },
  {
    value: "subscription",
    label: "Subscription",
    component: <Billing />,
  },
  {
    value: "password",
    label: "Password",
    component: <div>coming soon</div>,
  },
];

const Profile = () => {
  const [currentTab, setCurrentTab] = useState("profile");

  const handleChange = (_event, newValue) => setCurrentTab(newValue);

  return (
    <Container>
      <Tabs value={currentTab} onChange={handleChange} sx={{ mb: 5 }}>
        {tabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>
      {tabs.map((tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>)}
    </Container>
  );
};

export default Profile;
