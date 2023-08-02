import styles from "../Mailbox.module.css";
import React from "react";

export const MailView = () => {
  return (
    <div className={styles.right}>
      <div className={styles.right_mail_card}>
        <div className={styles.right_header}>
          <div className={styles.right_header_name}>Itzik</div>
          <div className={styles.right_header_date}>Today</div>
          <div className={styles.right_header_title}>How are you Itay?</div>
        </div>
        <div className={styles.right_content}>
          <div className={styles.right_content_text}>
            How are you? hope you had a great weekend
          </div>
        </div>
      </div>
      <div className={styles.right_footer}>
        <div className={styles.right_footer_textlabel}>Reply to user:</div>
        <textarea className={styles.right_footer_reply_textbox}></textarea>
        <div className={styles.right_footer_reply_actions}>
          <button className={styles.right_footer_reply_button}>Reply</button>
          <button className={styles.right_footer_reply_button}>Forward</button>
        </div>
      </div>
    </div>
  );
};
