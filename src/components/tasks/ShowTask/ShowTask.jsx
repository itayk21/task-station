import styles from "./ShowTask.module.css";
import moment from "moment";
import Participant from "../Participants/Participant";
import Participants from "../Participants/Participants";

const convertStatusToPercentage = (status) => {
  switch (status) {
    case "TO_DO":
      return 0;
    case "WIP":
      return 50;
    default:
      return 100;
  }
};

function daysRemaining(date) {
  const eventdate = moment(date);
  const todaysdate = moment();
  return eventdate.diff(todaysdate, "days") + 1;
}

const ShowTask = (props) => {
  const { item } = props;

  const statusAsPercentage = convertStatusToPercentage(item.status);
  const daysLeft = daysRemaining(item.end_date);

  return (
    <section className={styles.container}>
      <header>
        <div className={styles.header_left}></div>
        <div className={styles.header_right}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
      </header>
      <main>
        <div className={styles.completeStatus}>
          <p className={styles.completeStatus_percentage}>
            {statusAsPercentage + "% Completed"}
          </p>
          <p className={styles.completeStatus_days_left}>
            {daysLeft} days left
          </p>
        </div>
        <div className={styles.progress_bar}>
          <div
            className={styles.progress_bar_value}
            style={{ width: statusAsPercentage + "%" }}
          ></div>
        </div>
        <div>
          <Participants list={item.participants} />
        </div>
      </main>
      <footer></footer>
    </section>
  );
};

export default ShowTask;
