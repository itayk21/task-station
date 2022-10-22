import React, { useState } from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';
import { addNewTask } from '../../lib/firebase/actions';

export const NewTask = () => {
    const [titleName, setTitleName] = useState("")
    const [description, setDescription] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [worker, setWorker] = useState("")
    const [notes, setNotes] = useState("")

    const resetStates = () => {
        setTitleName("")
        setDescription("")
        setSpecialization("")
        setDate("")
        setTime("")
        setWorker("")
        setNotes("")
    }

    const onSubmit = () => {
        addNewTask({
            titleName, description, specialization, date, time, worker, notes


        })
        resetStates()
    }

    return (
        <div>
            <div>
                <div>
                    <TextField
                        id="outlined-read-only-input"
                        label="Task Description"
                        value={titleName}
                        onChange={(e) => setTitleName(e.target.value)}
                        style={{ width: "500px" }}
                        InputProps={{
                            readOnly: false,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-read-only-input"
                        label="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: "500px" }}
                        InputProps={{
                            readOnly: false,
                        }}
                    />
                </div>
                <div>

                    <TextField
                        id="outlined-read-only-input"
                        label="Task specialization"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        InputProps={{
                            readOnly: false,
                        }}
                    />

                    <TextField
                        id="outlined-read-only-input"
                        label="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type='date'
                        InputProps={{
                            readOnly: false,
                        }}
                    />

                    {/* <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="DateTimePicker"
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                    /> */}


                    <TextField
                        id="outlined-read-only-input"
                        label="Time"
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                        InputProps={{
                            readOnly: false,
                        }}
                    />

                </div>

                <div>
                    <TextField
                        id="outlined-read-only-input"
                        label="Participants"
                        value={worker}
                        onChange={(e) => setWorker(e.target.value)}
                        InputProps={{
                            readOnly: false,
                        }}
                    />
                </div>

                <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    multiline
                    rows={4}
                    style={{ width: "500px" }}

                />

                <div>
                    <Button variant="contained" endIcon={<SaveIcon />} onClick={e => onSubmit()}>
                        Add
                    </Button>


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
    )
}
