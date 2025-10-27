import React, { useContext, useState } from "react";
import TaskCard from "./TaskCard";
import ModalWindow from "./Modal";
import { NewTask } from "./NewTask";
import { validateManagerAccess } from "../../lib/utils";
import DropList from "./DropList";
import { useEffect } from "react";
import styles from "./TasksView.module.css";
import { UserContext } from "../layout/Base";

const statusOptions = [
  {
    value: "ALL",
    label: "All",
  },
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
    label: "done",
  },
  {
    value: "CANCELED",
    label: "canceled",
  },
];

const TasksView = ({
  isModalOpen,
  setIsModalOpen,
  data,
  workers,
  setTasks,
}) => {
  const userData = useContext(UserContext);
  const hasManagerAccess = validateManagerAccess(userData?.role);
  const [filteredData, setFilteredData] = useState(data || []);
  const activeUsers = workers.filter(
    (user) => user.role !== "canceled" && user.role !== "unverified"
  );
  const [workerFilter, setWorkerFilter] = useState("");
  const [workersList, setWorkersList] = useState("");

  const [searchParams, setSearchParams] = useState({
    workerValue: "ALL",
    statusValue: "ALL",
  });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const result = data.filter((item) => {
      const isWorkerAllMode = searchParams.workerValue === "ALL";
      const isStatusAllMode = searchParams.statusValue === "ALL";

      if (isStatusAllMode && isWorkerAllMode) {
        return true;
      }

      if (!isStatusAllMode && isWorkerAllMode) {
        return searchParams.statusValue === item?.status;
      }

      if (isStatusAllMode && !isWorkerAllMode) {
        const user = activeUsers.find(
          (userData) => userData.name === searchParams.workerValue
        );
        return item?.participants.some(
          (participant) => participant.split("-")[1] === user.email
        );
      }

      if (!isStatusAllMode && !isWorkerAllMode) {
        const user = activeUsers.find(
          (userData) => userData.name === searchParams.workerValue
        );
        return (
          item?.participants.some(
            (participant) => participant.split("-")[1] === user.email
          ) && searchParams.statusValue === item.status
        );
      }

      return false;
    });

    setFilteredData(result);
  }, [searchParams]);

  const usersDropdownData = activeUsers.map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
  });

  const onClickTitle = (idx) => {
    setIsModalOpen(true);
    setTaskIndex(idx);
  };

  const listData = !!workerFilter ? workersList : filteredData;

  const renderTasks = listData.map((item, idx) => {
    switch (userData?.role) {
      case undefined:
        break;
      case "unverified":
        return;
      default:
        // Ensure participant is a string before attempting to split
        const userInList = item?.participants?.some(
          (participant) =>
            typeof participant === "string" &&
            participant.split("-")[1] === userData.email
        );
        const taskIdx = data.map((e) => e.id).indexOf(item.id);

        if (hasManagerAccess || userInList) {
          return (
            <TaskCard
              key={taskIdx}
              data={item}
              onClickTitle={() => onClickTitle(taskIdx)}
            />
          );
        }
    }
  });

  //
  // const renderTasks = listData.map((item, idx) => {
  //   switch (userData?.role) {
  //     case undefined:
  //       break;
  //     case "unverified":
  //       return;
  //     default:
  //       const userInList = item?.participants?.some(
  //         (participant) => participant.split("-")[1] === userData.email
  //       );
  //       const taskIdx = data.map((e) => e.id).indexOf(item.id);
  //
  //       if (hasManagerAccess || userInList) {
  //         return (
  //           <TaskCard
  //             key={taskIdx}
  //             data={item}
  //             onClickTitle={() => onClickTitle(taskIdx)}
  //           />
  //         );
  //       }
  //   }
  // });

  const [taskIndex, setTaskIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <ModalWindow
        isModalOpen={isModalOpen}
        setIsModalOpen={(val) => {
          setIsModalOpen(val);
          setTaskIndex(null);
          setIsEdit(false);
        }}
      >
        {/* {taskIndex ? <TaskView data={data[parseInt(taskIndex)]} setIsEdit={setIsEdit} isEdit={isEdit} /> : <NewTask />} */}
        {taskIndex !== null ? (
          <NewTask
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            data={data[parseInt(taskIndex)]}
            setTasks={setTasks}
            setIsModalOpen={setIsModalOpen}
          />
        ) : (
          <NewTask
            isEdit={true}
            setTasks={setTasks}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </ModalWindow>
      <div className={styles.container}>
        <div className={styles.customControls}>
          {hasManagerAccess && (
            <button onClick={() => setIsModalOpen(true)}>New Task</button>
          )}
          <DropList
            label="Status"
            list={statusOptions}
            callback={(statusFilter) => {
              setSearchParams((prevState) => ({
                ...prevState,
                statusValue: statusFilter,
              }));
            }}
          />
          <DropList
            label="Worker"
            list={[{ label: "All", value: "ALL" }, ...usersDropdownData]}
            callback={(workerName) => {
              setSearchParams((prevState) => ({
                ...prevState,
                workerValue: workerName,
              }));
            }}
          />
        </div>
        {!filteredData.length && <div>No data found.</div>}
        {!!filteredData.length && (
          <div className={styles.cardContainer}>{renderTasks}</div>
        )}
      </div>
    </>
  );
};

export default TasksView;
