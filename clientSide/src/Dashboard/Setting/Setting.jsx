import React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import VipMembers from "./Tabs/VipMembers";
import SubscribedMembers from './Tabs/SubscribedMembers'



const Setting = () => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
     

      {/* Tabs */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
               <Tab label="List of Subscribed Members" value="1" /> 
        
              <Tab className="ms-5" label="List of VIP Members" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
          <SubscribedMembers />
          </TabPanel> 
        
          <TabPanel value="2">
            <VipMembers />
          </TabPanel>

        </TabContext>
      </Box>
    </div>
  );
};

export default Setting;
