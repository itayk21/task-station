import styles from "../Mailbox.module.css";
import React, { useState } from "react";
import { addConversationItem } from "../../../lib/firebase/chat-actions";

const MailReply = ({ onClickReply }) => {
  const [message, setMessage] = useState("");

  return (
    <div className={styles.right_footer}>
      <div className={styles.right_footer_textlabel}>Reply to user:</div>
      <textarea
        className={styles.right_footer_reply_textbox}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div className={styles.right_footer_reply_actions}>
        <button
          className={styles.right_footer_reply_button}
          onClick={() => onClickReply(message)}
        >
          Reply
        </button>
        <button className={styles.right_footer_reply_button}>Forward</button>
      </div>
    </div>
  );
};

export default MailReply;
