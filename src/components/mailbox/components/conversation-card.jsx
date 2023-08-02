import styles from "../Mailbox.module.css";
import React from "react";

export const ConversationCard = () => {
  return (
    <div className={styles.left_conversation}>
      <div className={styles.left_title_container}>
        <div className={styles.left_title_name}>name</div>
        <div className={styles.left_title_label}>title</div>
      </div>
      <div>description</div>
      <div>Date and time</div>
    </div>
  );
};
