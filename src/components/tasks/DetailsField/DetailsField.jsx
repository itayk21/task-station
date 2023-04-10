import styles from "./DetailsField.module.css";

const DetailsField = (props) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>{props.label}</p>
      <div className={styles.children}>{props.children}</div>
    </div>
  );
};
export default DetailsField;
