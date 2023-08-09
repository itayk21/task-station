import styles from "../Mailbox.module.css";
import React from "react";

const MailResponse = ({ name, date, title, message }) => {
  return (
    <div className={styles.right_mail_card}>
      <div className={styles.right_header}>
        <div className={styles.right_header_name}>{name}</div>
        <div className={styles.right_header_date}>{date}</div>
        <div className={styles.right_header_title}>{title}</div>
      </div>
      {message && (
        <div className={styles.right_content}>
          <div className={styles.right_content_text}>{message}</div>
        </div>
      )}
    </div>
  );
};

export default MailResponse;
