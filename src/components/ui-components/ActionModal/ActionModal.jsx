import styles from "./ActionModal.module.css";
import React from "react";

export const ActionModal = ({ isOpen = false, setIsOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.close} onClick={(e) => setIsOpen(false)}>
            <span>&#x2716;</span>
          </div>
        </header>
        <section>{children}</section>
      </div>
    </div>
  );
};
