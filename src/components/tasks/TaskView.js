import React, { useState } from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DropList from './DropList';
import { updateTask } from '../../lib/firebase/actions';
import DialogScreen from '../ui-components/DialogScreen';
import { Done } from '@mui/icons-material';

const statusOptions = [
    {
        value: 'TO_DO',
        label: 'To do',
    },
    {
        value: 'WIP',
        label: 'Work In Progress',
    },
    {
        value: 'STUCK',
        label: 'Stuck',
    },
    {
        value: 'ARCHIVED',
        label: 'Archived',
    }

];


const TaskView = ({ data, setData, isEdit, setIsEdit }) => {
    const [open, setOpen] = React.useState(false);
    const [isEndPressed, setIsEndPressed] = useState(false)
    const [isDisablePressed, setIisDisablePressed] = useState(false)

    const endTaskTitle = "End Task"
    const endMessage = "Do you want to end this task?"
    const deleteTitle = "Disable"
    const disableMessage = "Do you want to disable this task?"


    const isDone = data.status === 'DONE';
    const isDisable = data.status === 'DISABLE';

    return (
        <div>
            <DialogScreen onSuccessCallback={() => {
                updateTask(data.id, Object.assign(data, { status: "DONE" }));
            }} open={open} setOpen={setOpen}

                title={endTaskTitle} message={endMessage} />
            {/* To duplicates for all fields from 'data' and onChange for 'setData */}
            {isEdit ? <TextField
                id="outlined-read-only-input"
                label="Enter title name"
                value={data.titleName}
                onChange={(e) => setData.setTitleName(e.target.value)}
                style={{ width: "500px" }}
                InputProps={{
                    readOnly: false,
                }}
            /> : <h1 >{data.titleName}</h1>}

            {isEdit ? <TextField
                id="outlined-read-only-input"
                label="Enter Description"
                value={data.DescriptionValue}
                onChange={(e) => setData.setDescriptionValue(e.target.value)}
                style={{ width: "500px" }}
                InputProps={{
                    readOnly: false,
                }}
            /> : <p>Task Description: {data.DescriptionValue}</p>}

            <div>
                {isEdit ? <TextField
                    id="outlined-read-only-input"
                    label="Enter specialization"
                    value={data.specialization}
                    onChange={(e) => setData.setSpecialization(e.target.value)}
                    style={{ width: "200px" }}
                    InputProps={{
                        readOnly: false,
                    }}
                /> : <p>Task specialization: {data.specialization}</p>}


                <span>

                    {isEdit ? <TextField
                        id="outlined-read-only-input"
                        label="Enter date"
                        value={data.date}
                        onChange={(e) => setData.setDate(e.target.value)}
                        style={{ width: "200px" }}
                        InputProps={{
                            readOnly: false,
                        }}
                    /> : <p>End date: {data.date}</p>}

                    {isEdit ? <TextField
                        id="outlined-read-only-input"
                        label="Enter Time"
                        value={data.time}
                        onChange={(e) => setData.setTime(e.target.value)}
                        style={{ width: "200px" }}
                        InputProps={{
                            readOnly: false,
                        }}
                    /> : <p>End Time: {data.time}</p>}
                </span>
            </div>

            {isEdit ? <TextField
                id="outlined-read-only-input"
                label="Enter Workers to this job"
                value={data.workers}
                onChange={(e) => setData.setWorkers(e.target.value)}
                style={{ width: "500px" }}
                InputProps={{
                    readOnly: false,
                }}
            /> : <p>participants: {data.workers}</p>}


            <TextField
                id="outlined-multiline-static"
                label="Notes"
                inputProps={{
                    readOnly: !!isDone
                }}
                multiline
                rows={4}
                style={{ width: "500px" }}
                value={data.notes}
            />

            {/* Status */}
            {data.status !== 'DONE' && <DropList list={statusOptions} defaultValue={data.status || statusOptions[0].value} callback={(statusChanged) => {
                updateTask(data.id, Object.assign(data, { status: statusChanged }));
            }} />}



            {data.status !== 'DONE' && <div className="buttons">
                <Button variant="contained" endIcon={<EditIcon />} onClick={e => setIsEdit((prevState) => !prevState)}>
                    {isEdit ? "cancel" : "edit"}
                </Button>

                <Button onClick={() => setOpen(true)} variant="contained" endIcon={<DeleteIcon />}>
                    Delete
                </Button>

                {<Button onClick={() => setOpen(true)} variant="contained" endIcon={<DoneIcon />}>
                    {console.log(open)}
                    End task
                </Button>}
            </div>}
        </div >
    )
}

export default TaskView