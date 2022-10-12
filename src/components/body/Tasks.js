import { Button } from '@mui/material';
import React, { useState } from 'react'

import Tcomponent from '../tasks/Tcomponent';
import AddIcon from '@mui/icons-material/Add';



const Tasks = () => {

  const taskArr = [{ id: "0", title: "task1", decription: "fgfdgfdgdfgdfsgdfgfdgdfgfdg" },
  { id: "1", title: "task2", decription: "fgfdgfdgdfgdfsgdfgfdgdfgfdg" },
  { id: "2", title: "task1", decription: "fgfdgfdgdfgdfsgdfgfdgdfgfdg" }]


  const [tasks, setTask] = useState(taskArr)



  console.log('here')
  return (
    <div>

      <Button style={{ textTransform: 'none' }} variant="contained" startIcon={<AddIcon />}>
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
        <Tcomponent />
        <Tcomponent />
        <Tcomponent />
        <Tcomponent />
        <Tcomponent />
        <Tcomponent />
        <Tcomponent />
        <Tcomponent />
        <Tcomponent />
        <Tcomponent />
      </div>






    </div>



  )
}

export default Tasks;
