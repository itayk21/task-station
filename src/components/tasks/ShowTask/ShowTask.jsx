import styles from "./ShowTask.module.css";
import moment from "moment";
import Participant from "../Participants/Participant";
import Participants from "../Participants/Participants";
import DetailsField from "../DetailsField/DetailsField";
import DropList from "../DropList";
import { updateTask } from "../../../lib/firebase/actions";
import React, { useState } from "react";
import SelectInput from "../../ui-components/SelectInput";

const statusOptions = [
  {
    value: "TO_DO",
    label: "To do",
  },
  {
    value: "WIP",
    label: "Work In Progress",
  },
  {
    value: "STUCK",
    label: "Stuck",
  },
];

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
  const [status, setStatus] = useState(item.status);

  const statusAsPercentage = convertStatusToPercentage(item.status);
  const daysLeft = daysRemaining(item.end_date);

  const onChangeStatus = async (e) => {
    updateTask(item.id, Object.assign({}, { status: e.target.value }));
    setStatus(e.target.value);
  };

  return (
    <section className={styles.container}>
      <header>
        <div className={styles.header_details}>
          <div className={styles.header_left}></div>
          <div className={styles.header_right}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>

        <div className={styles.completeStatus}>
          <p className={styles.completeStatus_percentage}>
            {statusAsPercentage + "% Completed"}
          </p>

          <div>
            <p
              style={{ color: daysLeft < 0 ? "red" : null }}
              className={styles.completeStatus_days_left}
            >
              {daysLeft} days left
            </p>
          </div>
        </div>
        <div className={styles.progress_bar}>
          <div
            className={styles.progress_bar_value}
            style={{ width: statusAsPercentage + "%" }}
          ></div>
        </div>
        <div className={styles.workers_and_time}>
          <Participants list={item.participants} />
          <div>
            End date: {item.date} {item.time}
          </div>
        </div>
      </header>
      <main>
        <hr />
        <h1 className={styles.content_header}>Task Details:</h1>
        <DetailsField label={"Status:"}>
          <DropList
            list={statusOptions}
            defaultValue={statusOptions[0].value}
            callback={(statusChanged) => {
              updateTask("00", Object.assign({}, { status: statusChanged }));
            }}
          />

          <SelectInput
            list={statusOptions}
            defaultText={status}
            onChange={onChangeStatus}
            disabled={false}
            value={status}
          />
        </DetailsField>
      </main>
      <footer></footer>
    </section>
  );
};

export default ShowTask;
