import React, { useEffect } from "react";
import styles from "./Modal.module.css";

export default function ModalWindow({
  children,
  isModalOpen = false,
  setIsModalOpen,
}) {
  useEffect(() => {
    if (!!isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return (
    isModalOpen && (
      <div className={styles.overLay}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div
              className={styles.close}
              onClick={(e) => setIsModalOpen(false)}
            >
              <span>&#x2716;</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    )
  );
}
