import { useState } from "react";
import { Box } from "@mui/material";
import TabPanel from "components/TabPanel";
import SymptomPanel from "./Symptoms";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Causes from "./Causes";
import { useSymptoms } from "./hooks/useSymptoms";

const Symptoms = () => {
  const [tab, setTab] = useState(0);

  const { loading, symptoms, causes } = useSymptoms(tab);

  const handleChange = (_event, newValue) => {
    setTab(newValue);
  };
  return (
    <Box width="100%">
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Symptoms" disableRipple />
        <Tab label="Causes" disableRipple />
      </Tabs>

      <Box mt={4}>
        <TabPanel value={tab} index={0}>
          {!loading && <SymptomPanel initialValues={symptoms} />}
        </TabPanel>

        <TabPanel value={tab} index={1}>
          {!loading && <Causes initialValues={causes} />}
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Symptoms;
