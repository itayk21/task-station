import Participant from "./Participant";
import styles from "./Participants.module.css";

const Participants = ({ list }) => {
  const renderItems = list.map((item) => {
    if (!item.name) {
      return;
    }

    return <Participant name={item.name} />;
  });

  return <div className={styles.list}>{renderItems}</div>;
};

export default Participants;
