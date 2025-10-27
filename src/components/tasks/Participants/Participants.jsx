// import Participant from "./Participant";
// import styles from "./Participants.module.css";

// const Participants = ({ list }) => {
//   const renderItems = list.map((item) => {
//     if (!item.name) {
//       return;
//     }

//     return <Participant name={item.name} />;
//   });

//   return <div className={styles.list}>{renderItems}</div>;
// };

// export default Participants;

import Participant from "./Participant";
import styles from "./Participants.module.css";

const Participants = ({ list }) => {
  const renderItems = list.map((item, index) => {
    if (!item.name) {
      return null; //  Better than just 'return'
    }

    //  Added key prop - use item.id if available, otherwise email or index
    return (
      <Participant key={item.id || item.email || index} name={item.name} />
    );
  });

  return <div className={styles.list}>{renderItems}</div>;
};

export default Participants;
