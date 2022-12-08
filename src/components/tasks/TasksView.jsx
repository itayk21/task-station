import React, { useContext, useState } from 'react'
import TaskCard from './TaskCard';
import ModalWindow from './Modal';
import { NewTask } from './NewTask';
import TaskView from './TaskView';
import { UserContext } from '../../App';
import { validateManagerAccess } from '../../lib/utils';

const TasksView = ({ isModalOpen, setIsModalOpen, data }) => {
    const userData = useContext(UserContext);
    const hasManagerAccess = validateManagerAccess(userData?.role);

    const onClickTitle = (idx) => {
        setIsModalOpen(true);
        setTaskIndex(idx);
    }

    const renderTasks = data.map((item, idx) => {
        switch (userData?.role) {
            case undefined:
                break;
            case 'unverified':
                return;
            default:
                const userInList = item.participants.some((participant) => participant.split('-')[1] === userData.email);
                if (hasManagerAccess || userInList) {
                    return <TaskCard key={idx.toString()} data={item}
                        onClickTitle={() => onClickTitle(idx.toString())} />
                }
        }
    });

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

            {hasManagerAccess && <button onClick={() => setIsModalOpen(true)}>New Task</button>}
            <div style={{ display: "flex", flexWrap: "wrap" }}>{renderTasks}</div>
        </>
    )
}

export default TasksView