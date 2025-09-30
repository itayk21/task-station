import styles from "./ShowTask.module.css";
import moment from "moment";
import Participant from "../Participants/Participant";
import Participants from "../Participants/Participants";
import DetailsField from "../DetailsField/DetailsField";
import DropList from "../DropList";
import { updateTask } from "../../../lib/firebase/actions";
import React, { useState } from "react";
import SelectInput from "../../ui-components/SelectInput";
import TextArea from "../../ui-components/TextArea/TextArea";
import BaseButton from "../../ui-components/BaseButton/BaseButton";

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
  {
    value: "DONE",
    label: "Done",
  },
  {
    value: "CANCELED",
    label: "Canceled",
  },
];

const convertStatusToPercentage = (status) => {
  switch (status) {
    case "TO_DO":
    case "STUCK":
    case "CANCELED":
      return 0;
    case "WIP":
      return 50;
    case "DONE":
      return 100;
    default:
      return 0;
  }
};

function daysRemaining(date) {
  const eventdate = moment(date);
  const todaysdate = moment();
  return eventdate.diff(todaysdate, "days") + 1;
}

const ShowTask = (props) => {
  const { item, setIsEdit } = props;
  const [status, setStatus] = useState(item.status);
  const [notes, setNotes] = useState(item.notes);

  const statusAsPercentage = convertStatusToPercentage(status);
  const daysLeft = daysRemaining(item.date);
  const participantsObjectList = item.participants;

  const onChangeStatus = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus); // קודם עדכון UI מקומי
  
    await updateTask(item.id, { ...item, status: newStatus }); // בלי לשנות item
  };
  
  const updateCurrentTask = async () => {
    await updateTask(item.id, { ...item, status, notes });
  };

  return (
    <section className={styles.container}>
      <header>
        <div className={styles.header_details}>
          <div className={styles.header_left}></div>
          <div className={styles.header_right}>
            <h1>{item.titleName}</h1>
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
          <Participants list={[{ name: "itzik gabay" }]} />
          <div>
            End date: {item.date} {item.time}
          </div>
        </div>
      </header>
      <main>
        <hr />
        <h1 className={styles.content_header}>Task Details:</h1>
        <DetailsField label={"Status:"}>
          <SelectInput
            list={statusOptions}
            defaultText={status}
            onChange={onChangeStatus}
            disabled={false}
            value={status}
          />
        </DetailsField>

        <DetailsField label={"Notes:"}>
          <TextArea
            label="Notes:"
            showLabel={notes}
            isDisabled={false}
            onChange={(e) => setNotes(e.target.value)}
            name="notes"
            value={notes}
          />
        </DetailsField>
      </main>
      <footer>
        <div className={styles.footer_buttons}>
          <BaseButton label={"Update Task"} onClick={updateCurrentTask} />
          <BaseButton label={"Edit Task"} onClick={() => setIsEdit(true)} />
        </div>
      </footer>
    </section>
  );
};

export default ShowTask;
