import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

import Tcomponent from '../tasks/Tcomponent';
import AddIcon from '@mui/icons-material/Add';
import { addNewTask, findAllTasks } from '../../lib/firebase/actions';
import styles from './Task.module.css'
import TasksView from '../tasks/TasksView';

const Tasks = ({ user }) => {
  const data = findAllTasks();
  const dataAsArray = Object.values(data || {});

  setTimeout(() => {
    setIsLoaded(true);
  }, 1500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return <TasksView data={dataAsArray} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />;

}

export default Tasks;
