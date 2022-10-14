import { Button } from '@mui/material';
import React, { useState } from 'react'

import Tcomponent from '../tasks/Tcomponent';
import AddIcon from '@mui/icons-material/Add';
import { addNewTask } from '../../lib/firebase/actions';



const Tasks = () => {

  const taskArr = [{ id: "0", title: "task1", decription: "fgfdgfdgdfgdfsgdfgfdgdfgfdg" },
  { id: "1", title: "task2", decription: "fgfdgfdgdfgdfsgdfgfdgdfgfdg" },
  { id: "2", title: "task1", decription: "fgfdgfdgdfgdfsgdfgfdgdfgfdg" }]


  const [tasks, setTask] = useState(taskArr)
  const [isModalOpen, setIsModalOpen] = useState(false);



  console.log('here')
  return (
    <div>

      <Button style={{ textTransform: 'none' }} variant="contained" startIcon={<AddIcon />} onClick={() => {
        setIsModalOpen(true);
        // addNewTask();
      }}>
        New task
      </Button>

      {/* <div className='titleContainer'>
        <p className='title'>My tasks</p>
      </div> */}

      <div>
        {/* {
        tasks.map((task)=>
        
        )
        } */}

      </div>



      <div className='task-cards'>
        <Tcomponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>






    </div>



  )
}

export default Tasks;
