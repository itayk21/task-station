import React from "react";
import styles from "./Mailbox.module.css";
import Conversations from "./components/conversations";
import { MailView } from "./components/mail-view";

const MailboxPage = () => {
  return (
    <div className={styles.container}>
      <Conversations />
      <MailView />
    </div>
  );
};

export default MailboxPage;
