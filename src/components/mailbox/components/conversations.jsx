import React from "react";
import styles from "../Mailbox.module.css";
import { ConversationCard } from "./conversation-card";

const Conversations = () => {
  return (
    <div className={styles.left}>
      <ConversationCard />
      <ConversationCard />
    </div>
  );
};

export default Conversations;
