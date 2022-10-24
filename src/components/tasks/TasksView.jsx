import React, { useState } from 'react'
import TaskCard from './TaskCard';
import ModalWindow from './Modal';
import { NewTask } from './NewTask';
import TaskView from './TaskView';

const TasksView = ({ isModalOpen, setIsModalOpen, data }) => {
    const onClickTitle = (idx) => {
        setIsModalOpen(true);
        setTaskIndex(idx);
    }

    const renderTasks = data.map((item, idx) => <TaskCard key={idx.toString()} data={item}
        onClickTitle={() => onClickTitle(idx.toString())} />);
    const [taskIndex, setTaskIndex] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            <ModalWindow isModalOpen={isModalOpen} setIsModalOpen={(val) => {
                setIsModalOpen(val);
                setTaskIndex(null)
                setIsEdit(false);
            }} >

                {/* {taskIndex ? <TaskView data={data[parseInt(taskIndex)]} setIsEdit={setIsEdit} isEdit={isEdit} /> : <NewTask />} */}
                {taskIndex ? <NewTask isEdit={isEdit} setIsEdit={setIsEdit} data={data[parseInt(taskIndex)]} /> : <NewTask isEdit={true} />}
            </ModalWindow>

            <button onClick={() => setIsModalOpen(true)}>New Task</button>
            <div style={{ display: "flex" }}>{renderTasks}</div>
        </>
    )
}

export default TasksView