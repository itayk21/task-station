import React from "react";
import { Header } from "../header/Header";
import TabPanel from "@mui/lab/TabPanel";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Contact from "../body/Contact";
import Tasks from "../body/Tasks";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Active_workers from "../body/Active_workers";
import { red } from "@mui/material/colors";
import EmailIcon from "@mui/icons-material/Email";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Login from "../auth/Login";
import AddUser from "../users/AddUser";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import { useContext } from "react";
import { validateAdminAccess } from "../../lib/utils";
import { useState } from "react";
import Profile from "../profile/Profile";
import { UserContext } from "../layout/Base";

export const Main = () => {
  const userData = useContext(UserContext);
  const [tabIndex, setTabIndex] = useState("0");
  const user = userData;

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const hasAdminAccess = validateAdminAccess(userData?.role);

  return (
    <div className="tabsContainer">
      {userData.role !== "unverified" && userData.role !== "canceled" ? (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabIndex}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="WORKERS"
                  icon={<EngineeringIcon className="worker" />}
                  value={"1"}
                />
                <Tab
                  label="TASKS"
                  icon={<TaskAltIcon className="task" />}
                  value={"0"}
                />
                <Tab
                  label="MAIL"
                  icon={<EmailIcon className="mail-logo" />}
                  value={"3"}
                />

                {hasAdminAccess && (
                  <Tab
                    label="ADD USER"
                    icon={<GroupAddIcon className="addUser" />}
                    value={"4"}
                  />
                )}

                {hasAdminAccess && (
                  <Tab
                    label="MANAGEMENT"
                    icon={<GroupAddIcon className="addUser" />}
                    value={"5"}
                  />
                )}
              </TabList>
            </Box>
            <TabPanel value={"1"}>
              <Active_workers />
            </TabPanel>
            <TabPanel value={"0"}>
              <Tasks user={user} />
            </TabPanel>
            <TabPanel value={"3"}>
              <Contact />
            </TabPanel>
            <TabPanel value={"4"}>
              <AddUser />
            </TabPanel>
          </TabContext>
        </Box>
      ) : (
        <div>
          {userData.role === "canceled"
            ? "This account is disabled."
            : "You need to be verified"}{" "}
        </div>
      )}
    </div>
  );
};
