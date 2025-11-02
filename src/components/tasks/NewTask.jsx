import React, { useEffect, useState } from "react";
import { findAllTasks, findAllUsers } from "../../lib/firebase/actions";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import SaveIcon from "@mui/icons-material/Save";
import Autocomplete from "@mui/material/Autocomplete"; // ADD THIS
import Chip from "@mui/material/Chip"; // ADD THIS
import { addNewTask, updateTask } from "../../lib/firebase/actions";
import DialogScreen from "../ui-components/DialogScreen";
import DropList from "./DropList";
import MultipleSelection from "../ui-components/MultipleSelection";
import { format, formatDistanceToNow } from "date-fns";
import { PickTime } from "../ui-components/TimePicker";
import TextInput from "../ui-components/TextInput";
import SelectInput from "../ui-components/SelectInput";
import TextArea from "../ui-components/TextArea/TextArea";
import translations from "../../lib/utils/translations";
import "./newTask.css";
import ShowTask from "./ShowTask/ShowTask";
import BaseButton from "../ui-components/BaseButton/BaseButton";
import MultiSelectionNew from "../ui-components/MultipleSelectionNew/MultipleSelectionNew";

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

const availableActions = {
  END_TASK: "END_TASK",
  CANCEL_TASK: "CANCEL_TASK",
};

function getTime() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return yyyy + "-" + mm + "-" + dd;
}
export const NewTask = ({
  data = {},
  isEdit,
  setIsEdit,
  setTasks,
  setIsModalOpen,
}) => {
  const currentTime = new Date();

  const currentTimeWithFormat = format(currentTime, "yyyy-MM-dd");

  const [open, setOpen] = React.useState(false);
  const [action, setAction] = useState(availableActions.END_TASK);
  const [titleName, setTitleName] = useState(data.titleName || "");
  const [description, setDescription] = useState(data.description || "");
  const [specialization, setSpecialization] = useState(
    data.specialization || ""
  );
  const [date, setDate] = useState(data.date || getTime());
  const [time, setTime] = useState(data.time || "10:00");
  const [notes, setNotes] = useState(data.notes || "");
  const [participants, setParticipants] = useState(data.participants || []);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [hasSubmitError, setHasSubmitError] = useState(false);

  // const filteredParticipants =
  //   (participants.length &&
  //     participants?.filter((participant) => {
  //       console.log(participants);
  //       return participant.role === "user";
  //     })) ||
  //   [];

  const isEndTaskMode = action === "END_TASK";
  const isDone = data.status === "DONE";
  const isCanceled = data.status === "CANCELED";

  useEffect(() => {
    if (!participants.length) {
      findAllUsers(setParticipants);
    }
  }, []);

  // Initialize selected participants when data is available
  useEffect(() => {
    if (data.participants && data.participants.length > 0) {
      setSelectedParticipants(data.participants);
    }
  }, [data.participants, participants]);

  // useEffect(() => {
  //   console.log("=== DEBUG INFO ===");
  //   console.log("isEdit:", isEdit);
  //   console.log("isDone:", isDone);
  //   console.log("isCanceled:", isCanceled);
  //   console.log("selectedParticipants:", selectedParticipants);
  //   console.log("filteredParticipants:", filteredParticipants);
  //   console.log("==================");
  // }, [isEdit, isDone, isCanceled, selectedParticipants, filteredParticipants]);

  // useEffect(() => {
  //   if (!participants.length) {
  //     findAllUsers(setParticipants);
  //   }
  // }, []);

  const generateTaskData = () => {
    return {
      id: data.id,
      status: data.status,
      titleName,
      description,
      specialization,
      date,
      time,
      participants: selectedParticipants,
      notes,
    };
  };

  const resetStates = () => {
    setTitleName(data.titleName || "");
    setDescription(data.description || "");
    setSpecialization(data.specialization || "");
    setDate(data.date || getTime());
    setTime(data.time || "10:00");
    setSelectedParticipants(data.participants || []);
    setNotes(data.notes || "");
  };

  const converStringDateToDate = (date) => {
    const [year, month, day] = date.split("-");

    return new Date(year, month - 1, day);
  };

  const getCurrentHour = () => {
    const date = new Date();
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  };

  const onSubmit = () => {
    setHasSubmitError(null);

    const dateStringAsDateObj = converStringDateToDate(date);
    const formTimeAsHour = time.split(":")[0];
    const formTimeAsMinutes = time.split(":")[1];
    const currentTime = getCurrentHour();
    const dateOlderThanNow =
      dateStringAsDateObj.getTime() < new Date().getTime();
    const isToday =
      dateStringAsDateObj.toDateString() == new Date().toDateString();

    if (titleName.length < 2) {
      return setHasSubmitError(translations.errors.NOT_ENOUGH_CHAR_TITLE_ERR);
    }

    if (description.length < 2) {
      return setHasSubmitError(translations.errors.NOT_ENOUGH_CHAR_DESC_ERR);
    }

    if (dateOlderThanNow && !isToday) {
      return setHasSubmitError(translations.errors.INVALID_DATE_ERR);
    }

    if (
      (isToday && formTimeAsHour < currentTime.hour) ||
      (isToday &&
        formTimeAsMinutes < currentTime.minute &&
        formTimeAsHour < currentTime.hour)
    ) {
      return setHasSubmitError(translations.errors.INVALID_TIME_ERR);
    }

    if (!selectedParticipants.length) {
      return setHasSubmitError(translations.errors.PARTICIPANTS_LENGTH_ERR);
    }

    addNewTask({
      titleName,
      description,
      specialization,
      date,
      time,
      participants: selectedParticipants,
      notes,
      status: "TO_DO",
    });

    resetStates();

    findAllTasks(setTasks);

    setIsModalOpen(false);
  };

  const CONSTANTS = {
    END_TASK_TITLE: "End Task",
    END_TASK_MSG: "Do you want to end this task?",
    DISABLE_TITLE: "Disable",
    DISABLE_MSG: "Do you want to disable this task?",
  };
  console.log("ppppp" + selectedParticipants);
  const participantsContainer = !!participants.length && (
    <>
      <ol>
        {participants?.map((participant) => (
          <li key={participant.id || participant.email}>
            {JSON.stringify(participant)}
          </li>
        ))}
      </ol>
    </>
  );

  if (!isEdit) {
    return (
      <ShowTask
        item={{
          id: data.id,
          titleName,
          description,
          status: data.status,
          end_date: date,
          participants,
          date,
          time,
          notes,
        }}
        setIsEdit={setIsEdit}
      />
    );
  }

  return (
    <div>
      <DialogScreen
        onSuccessCallback={() => {
          isEndTaskMode
            ? updateTask(data.id, Object.assign(data, { status: "DONE" }))
            : updateTask(data.id, Object.assign(data, { status: "CANCELED" }));
        }}
        open={open}
        setOpen={setOpen}
        title={
          isEndTaskMode ? CONSTANTS.END_TASK_TITLE : CONSTANTS.DISABLE_TITLE
        }
        message={isEndTaskMode ? CONSTANTS.END_TASK_MSG : CONSTANTS.DISABLE_MSG}
      />

      <h1 className={"taskTitle"}>Create Your Task</h1>

      <div className="task_action_container">
        <div className="task_title_container">
          {isEdit ? (
            <TextInput
              label="Task Name"
              value={titleName}
              onChange={(e) => setTitleName(e.target.value)}
            />
          ) : (
            <div>
              <h1>{titleName}</h1>
            </div>
          )}
        </div>

        <div>
          {isEdit ? (
            <TextArea
              label="Description:"
              showLabel={description}
              isDisabled={isDone || isCanceled}
              onChange={(e) => setDescription(e.target.value)}
              name="description_value"
              value={description}
            />
          ) : (
            <>
              <div>Description:</div>
              <div>{description}</div>
            </>
          )}
        </div>
        <div>
          {isEdit ? (
            <input
              className={"date_input"}
              type="date"
              name="begin"
              placeholder="dd-mm-yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={currentTimeWithFormat}
              max="2030-12-31"
            />
          ) : (
            <div>End date:{date}</div>
          )}

          {isEdit ? (
            <PickTime value={time} setValue={setTime} />
          ) : (
            <div>End time:{time}</div>
          )}
        </div>

        <div>
          <div>
            {isEdit ? (
              participants.length > 0 ? (
                <Autocomplete
                  multiple
                  disabled={isDone || isCanceled}
                  options={participants}
                  getOptionLabel={(option) =>
                    `${option.name} (${option.email})`
                  }
                  value={participants.filter((p) => {
                    console.log(selectedParticipants);
                    return selectedParticipants.includes(
                      `${p.name}-${p.email}`
                    );
                  })}
                  onChange={(event, newValue) => {
                    const formatted = newValue.map(
                      (p) => `${p.name}-${p.email}`
                    );
                    setSelectedParticipants(formatted);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Workers Names"
                      placeholder="Select workers"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={option.id || option.email || index}
                        label={option.name}
                        {...getTagProps({ index })}
                        disabled={isDone || isCanceled}
                      />
                    ))
                  }
                />
              ) : (
                <div>Loading participants...</div>
              )
            ) : (
              <>
                <div>Participants:</div>
                <div>{participantsContainer}</div>
              </>
            )}
          </div>
        </div>

        {/* Status */}
        {!isDone && !isCanceled && data.titleName && (
          <DropList
            list={statusOptions}
            defaultValue={data.status || statusOptions[0].value}
            callback={(statusChanged) => {
              updateTask(
                data.id,
                Object.assign(data, { status: statusChanged })
              );
            }}
          />
        )}

        <TextArea
          label="Notes:"
          showLabel={notes}
          isDisabled={isDone || isCanceled}
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
          value={notes}
        />

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          {!data.titleName && (
            <>
              <BaseButton label={"Add Task"} onClick={onSubmit} />
            </>
          )}

          {!isDone && !isCanceled && data.titleName && (
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={() => {
                setIsEdit((prevState) => !prevState);
                if (isEdit) {
                  resetStates();
                }
              }}
            >
              {isEdit ? "Cancel" : "Edit"}
            </Button>
          )}

          {isEdit && data.titleName && (
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={() => {
                updateTask(data.id, generateTaskData());
                setIsEdit(false);
              }}
            >
              Save
            </Button>
          )}

          {!isDone && !isCanceled && data.titleName && !isEdit && (
            <Button
              onClick={() => {
                setAction(availableActions.END_TASK);
                setOpen(true);
              }}
              variant="contained"
              endIcon={<DoneIcon />}
            >
              End task
            </Button>
          )}

          {!isDone &&
            !isCanceled &&
            data.status !== "DONE" &&
            data.titleName &&
            !isEdit && (
              <Button
                onClick={() => {
                  setAction(availableActions.CANCEL_TASK);
                  setOpen(true);
                }}
                variant="contained"
                endIcon={<DoneIcon />}
              >
                Cancel task
              </Button>
            )}

          <div>{hasSubmitError}</div>

          {/*
                    <Button variant="contained" endIcon={<DeleteIcon />}>
                        Delete
                    </Button>

                    <Button variant="contained" endIcon={<DoneIcon />}>
                        End task
                    </Button> */}
        </div>
      </div>
    </div>
  );
};
