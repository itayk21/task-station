import { Modal } from '@mui/material'
import React, { useRef, useState } from 'react'
import ModalWindow from './Modal'
import taskView from './TaskView'
import styles from './Modal.module.css'
import { NewTask } from './NewTask'


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';

import Stack from '@mui/material/Stack';
import { margin } from '@mui/system'
import { Margin } from '@mui/icons-material'
import TaskView from './TaskView'


function Tcomponent({ item, isModalOpen, setIsModalOpen }) {
    const [isEdit, setIsEdit] = useState(false)



    return (
        <div>
            <ModalWindow isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
                <TaskView isEdit={isEdit} setIsEdit={setIsEdit} data={{ titleName, DescriptionValue, specialization, date, time, workers, notes }}
                    setData={{ setTitleName, setDescriptionValue, setSpecialization, setDate, setTime, setWorkers, setNotes }} />
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