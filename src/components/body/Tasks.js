import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

import Tcomponent from '../tasks/Tcomponent';
import AddIcon from '@mui/icons-material/Add';
import { findAllTasks, findAllUsers } from '../../lib/firebase/actions';
import styles from './Task.module.css'
import TasksView from '../tasks/TasksView';

const Tasks = ({ user }) => {
  const data = findAllTasks();
  const dataAsArray = Object.values(data || {});

  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    findAllUsers(setWorkers);
    const findInterval = setInterval(() => {
      findAllUsers(setWorkers)
    }, 3000);

    // When we are using return on useEffect with
    // clear interval, it will delete the interval
    // when we moving between pages in the componens
    // in othe words, it will stop the interval on destroy.
    return () => {
      clearInterval(findInterval);
    }
  }, []);

  setTimeout(() => {
    setIsLoaded(true);
  }, 1500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return <TasksView data={dataAsArray} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} workers={workers} />;

}

export default Tasks;
