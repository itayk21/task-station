import { useContext } from "react";
import { UserContext } from "../Base";
import LabelTemplate from "../../ui-components/LabelTemplate/LabelTemplate";
import worker_logo from "./worker.png";
import { Nav } from "@fluentui/react";

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
            url: "/profile/123",
            expandAriaLabel: "Expand Home section",
          },
          {
            name: "Tasks",
            url: "/tasks",
            expandAriaLabel: "Expand Home section",
          },
          {
            name: "Workers",
            url: "/workers",
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

export const Sidebar = () => {
  const userData = useContext(UserContext);

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
