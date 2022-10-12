import React from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Stack from '@mui/material/Stack';

const taskView = () => {

    const [titleName, setTitleName] = useState("task1")
    const [DescriptionValue, setDescriptionValue] = useState("make 100 stikers")
    const [specialization, setSpecialization] = useState("production")
    const [date, setDate] = useState("10/09/2022")
    const [time, setTime] = useState("15:47")
    const [worker, setWorker] = useState("eyal moyal")
    const [notes, setNotes] = useState("")

    return (
        <div>
            <h1 >{titleName}</h1>
            <p>Task Description: {DescriptionValue}</p>
            <p>Task specialization: {specialization}</p>
            <span>
                <p>End date and time: {date} {time}</p>
            </span>
            <p>participants: {worker}</p>

            <TextField
                id="outlined-multiline-static"
                label="Notes"
                multiline
                rows={4}
                style={{ width: "500px" }}
                defaultValue={notes}
            />

            <div className={styles.buttons}>
                <Button variant="contained" endIcon={<EditIcon />}>
                    Edit
                </Button>

                <Button variant="contained" endIcon={<DeleteIcon />}>
                    Delete
                </Button>

                <Button variant="contained" endIcon={<DoneIcon />}>
                    End task
                </Button>
            </div>
        </div>
    )
}

export default taskView