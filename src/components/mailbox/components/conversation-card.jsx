import styles from "../Mailbox.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ConversationCard = ({ name, message, date, userId }) => {
  const navigate = useNavigate();

  // todo: fix that because of refresh issue
  const handleNavigation2 = () => {
    navigate(`/mailbox/${userId}`);
  };

  const handleNavigation = () => {
    window.open(`/mailbox/${userId}`, "_self");
  };

  return (
    <div className={styles.left_conversation} onClick={handleNavigation}>
      <div className={styles.left_title_container}>
        <div className={styles.left_title_name}>{name}</div>
      </div>
      <div>{message}</div>
      <div>{date}</div>
    </div>
  );
};
