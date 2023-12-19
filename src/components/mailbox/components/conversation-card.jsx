import styles from "../Mailbox.module.css";
import React from "react";

export const ConversationCard = ({ name, message, date }) => {
  return (
    <div className={styles.left_conversation}>
      <div className={styles.left_title_container}>
        <div className={styles.left_title_name}>{name}</div>
      </div>
      <div>{message}</div>
      <div>{date}</div>
    </div>
  );
};
