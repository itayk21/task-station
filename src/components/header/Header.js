import React, { useContext, useState } from "react";
import styles from "./style.css";
import logo from "../../assets/images/logo2.png";
import { Button } from "@mui/material";
import { disconnect } from "../../lib/firebase/auth";
import DropList from "../tasks/DropList";
import { updateUserWorkStatus } from "../../lib/firebase/actions";
import { validateManagerAccess } from "../../lib/utils";
import { UserContext } from "../layout/Base";
import { useNavigate } from "react-router-dom";

const statusList = [
  {
    value: "UNAVAILABLE",
    label: "Unavailable",
  },
  {
    value: "ONLINE",
    label: "Online",
  },
  {
    value: "BREAK",
    label: "Break",
  },
];

export const Header = ({ user }) => {
  const userData = useContext(UserContext);
  const [selectValue, setSelectValue] = useState(userData?.work_status || "");
  const hasManagerAccess = validateManagerAccess(userData?.role);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  const onStatusChange = (e) => {
    setSelectValue(e.target.value);
    updateUserWorkStatus(userData, e.target.value);
    console.log("userData", userData);
  };

  const toggleWorkStatus = () => {
    if (selectValue === "OFFLINE") {
      updateUserWorkStatus(userData, "ONLINE");
      setSelectValue("ONLINE");
    } else {
      updateUserWorkStatus(userData, "OFFLINE");
      setSelectValue("OFFLINE");
    }
  };

  return (
    <div className="header">
      <img className="logo" src={logo} alt="logo" onClick={handleNavigation} />

      {!!user && (
        <div>
          <button
            className="disconnectButton"
            onClick={() => {
              disconnect();
            }}
          >
            Disconect {userData?.name}
          </button>

          <select
            onChange={onStatusChange}
            value={selectValue}
            disabled={selectValue === "OFFLINE"}
          >
            {statusList.map((item, idx) => (
              <option key={idx} value={item.value}>
                {selectValue === "OFFLINE" ? "OFFLINE" : item.label}
              </option>
            ))}
          </select>

          <button onClick={toggleWorkStatus}>
            {selectValue === "OFFLINE" ? "Login work" : "Logout work"}
          </button>
        </div>
      )}
    </div>
  );
};
