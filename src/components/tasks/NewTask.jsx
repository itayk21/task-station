import React, { useEffect, useState } from "react";
import { findAllUsers } from "../../lib/firebase/actions";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import SaveIcon from "@mui/icons-material/Save";
import { addNewTask, updateTask } from "../../lib/firebase/actions";
import DialogScreen from "../ui-components/DialogScreen";
import DropList from "./DropList";
import MultipleSelection from "../ui-components/MultipleSelection";
import { format, formatDistanceToNow } from "date-fns";
import { PickTime } from "../ui-components/TimePicker";
import TextInput from "../ui-components/TextInput";
import SelectInput from "../ui-components/SelectInput";
import TextArea from "../ui-components/TextArea/TextArea";

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
export const NewTask = ({ data = {}, isEdit, setIsEdit }) => {
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
  const [time, setTime] = useState(data.time || "");
  const [notes, setNotes] = useState(data.notes || "");
  const [participants, setParticipants] = useState(data.participants || []);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isDateError, setIsDateError] = useState(false);

  const filteredParticipants =
    (participants.length &&
      participants?.filter((participant) => {
        return participant.role === "user";
      })) ||
    [];

  useEffect(() => {
    if (!participants.length) {
      findAllUsers(setParticipants);
    }
  }, []);

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
    setDate(data.date || "");
    setTime(data.time || "");
    setParticipants(data.participants || "");
    setNotes(data.notes || "");
  };

  const onSubmit = () => {
    //send to database
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
  };

  const CONSTANTS = {
    END_TASK_TITLE: "End Task",
    END_TASK_MSG: "Do you want to end this task?",
    DISABLE_TITLE: "Disable",
    DISABLE_MSG: "Do you want to disable this task?",
  };

  const isEndTaskMode = action === "END_TASK";
  const isDone = data.status === "DONE";
  const isCanceled = data.status === "CANCELED";

  const participantsContainer = !!participants.length && (
    <>
      <ol>
        {participants?.map((participant, idx) => {
          return <li key={idx}>{JSON.stringify(participant)}</li>;
        })}
      </ol>
    </>
  );

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
          {isEdit ? (
            <>
              <MultipleSelection
                label="Workers Names:"
                names={filteredParticipants}
                setSelectedParticipants={setSelectedParticipants}
                selectedParticipants={selectedParticipants}
              />
            </>
          ) : (
            <>
              <div>Parcitipants:</div>
              <div>{participantsContainer}</div>
            </>
          )}
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

        <div>
          {!data.titleName && (
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={() => onSubmit()}
            >
              Add
            </Button>
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
