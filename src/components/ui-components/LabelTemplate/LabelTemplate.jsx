import React, { useState } from "react";
import styles from "./LabelTemplate.module.css";

const LabelTemplate = ({ label, image }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      className={`${styles.logo_lable} ${isHover ? "active" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className={styles.photo} src={image} />
      {isHover && <p>{label}</p>}
    </div>
  );
};
export default LabelTemplate;
