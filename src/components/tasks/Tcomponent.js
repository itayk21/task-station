import { Modal } from '@mui/material'
import React, { useRef, useState } from 'react'
import ModalWindow from './Modal'
import taskView from './TaskView'
import styles from './Modal.module.css'


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';

import Stack from '@mui/material/Stack';
import { margin } from '@mui/system'
import { Margin } from '@mui/icons-material'

function Tcomponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOn, setIsEditOn] = useState(false)

    const [titleName, setTitleName] = useState("Teva")
    const [DescriptionValue, setDescriptionValue] = useState("make 100 stikers")
    const [specialization, setSpecialization] = useState("production")
    const [date, setDate] = useState("10 / 09 / 2022")
    const [time, setTime] = useState("15:47")
    const [worker, setWorker] = useState("eyal moyal")
    const [notes, setNotes] = useState("")

    function editOn() {
        setIsEditOn(true)
    }





    return (
        <div onChange={e => setIsEditOn(true)}>
            <ModalWindow isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >

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
                        <Button variant="contained" endIcon={<EditIcon />} onClick={e => editOn(true)}>

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

                {/* <div onChange={e => setIsEditOn(true)}>
                    <h1 >{titleName}</h1>

                    <div className={styles.edit_fild}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Task Description"
                            defaultValue={DescriptionValue}
                            style={{ width: "500px" }}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    </div>





                    <div className={styles.edit_fild}>

                        <TextField
                            id="outlined-read-only-input"
                            label="Task specialization"
                            defaultValue={specialization}
                            InputProps={{
                                readOnly: false,
                            }}
                        />

                        <TextField
                            id="outlined-read-only-input"
                            label="Date"
                            defaultValue={date}
                            type='date'
                            InputProps={{
                                readOnly: false,
                            }}
                        />



                        <TextField
                            id="outlined-read-only-input"
                            label="Time"
                            defaultValue={time}
                            type='time'
                            InputProps={{
                                readOnly: false,
                            }}
                        />

                    </div>

                    <div className={styles.edit_fild}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Participants"
                            defaultValue={worker}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    </div>

                    <TextField
                        id="outlined-multiline-static"
                        label="Notes"
                        multiline
                        rows={4}
                        style={{ width: "500px" }}
                        defaultValue={notes}
                    />

                    <div className={styles.buttons}>
                        <Button variant="contained" endIcon={<SaveIcon />}>
                            Save
                        </Button>

                        <Button variant="contained" endIcon={<DeleteIcon />}>
                            Delete
                        </Button>

                        <Button variant="contained" endIcon={<DoneIcon />}>
                            End task
                        </Button>


                    </div>
                </div> */}


            </ModalWindow >


            <div className='card' >

                <div className='titleCardFrame' onClick={e => setIsModalOpen(true)}>
                    <p className='titleCard'>להכין 100 מדבקות</p>
                </div>
                <div className='descriptionFrame'>
                    <p className='description'>להכין 100 מדבקות</p>
                </div>

                <div className='dateTime'>
                    <span className='date'>10/01/2022</span>
                    <span className='time'>12:30</span>
                </div>
            </div>
        </div >
    )
}

export default Tcomponent