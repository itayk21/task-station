import { useContext } from "react";
import { UserContext } from "../Base";
import LabelTemplate from "../../ui-components/LabelTemplate/LabelTemplate";
import worker_logo from "./worker.png";
import { Nav } from "@fluentui/react";

const navStyles = {
  root: {
    width: 208,
    height: 350,
    boxSizing: "border-box",
    border: "1px solid #eee",
    overflowY: "auto",
  },
};

function _onLinkClick(ev, item) {
  if (item && item.name === "News") {
    alert("News link clicked");
  }
}

export const Sidebar = ({ user }) => {
  const navLinkGroups = [
    {
      links: [
        {
          name: "My workspace",
          url: "/",
          expandAriaLabel: "Expand Home section",
          disabled: true,
          links: [
            {
              name: "Personal Profile",
              url: `/profile/${user.uid}`,
              expandAriaLabel: "Expand Home section",
            },
            {
              name: "Tasks",
              url: "/tasks",
              expandAriaLabel: "Expand Home section",
            },
            {
              name: "Workers Status",
              url: "/workers",
              expandAriaLabel: "Expand Home section",
            },
            {
              name: "Organization",
              url: "/organizationWorkers",
              expandAriaLabel: "Expand Home section",
            },
            {
              name: "Messages",
              url: "/mailbox",
              expandAriaLabel: "Expand Home section",
            },
          ],
          isExpanded: true,
        },
        {
          name: "Management",
          url: "/",
          expandAriaLabel: "Expand Home section",
          disabled: true,
          links: [
            {
              name: "Add User",
              url: "/addUser",
              expandAriaLabel: "Expand Home section",
            },
          ],
          isExpanded: true,
        },
      ],
    },
  ];

  return (
    <div>
      <Nav
        onLinkClick={_onLinkClick}
        selectedKey="key3"
        ariaLabel="Nav basic example"
        styles={navStyles}
        groups={navLinkGroups}
      />
    </div>
  );
};
