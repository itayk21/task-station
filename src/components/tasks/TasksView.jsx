import React, { useContext, useState } from 'react'
import TaskCard from './TaskCard';
import ModalWindow from './Modal';
import { NewTask } from './NewTask';
import TaskView from './TaskView';
import { UserContext } from '../../App';
import { validateManagerAccess } from '../../lib/utils';
import DropList from './DropList';

const statusOptions = [
    {
        value: 'ALL',
        label: 'All',
    },
    {
        value: 'TO_DO',
        label: 'To do',
    },
    {
        value: 'WIP',
        label: 'Work In Progress',
    },
    {
        value: 'STUCK',
        label: 'Stuck',
    },
    {
        value: 'DONE',
        label: 'done',
    }, {
        value: 'CANCELED',
        label: 'canceled',
    }

];

const TasksView = ({ isModalOpen, setIsModalOpen, data, workers }) => {
    const userData = useContext(UserContext);
    const hasManagerAccess = validateManagerAccess(userData?.role);
    const [filteredData, setFilteredData] = useState(data || []);
    const activeUsers = workers.filter((user) => user.role !== 'canceled' && user.role !== 'unverified');
    console.log('activeUsers', activeUsers)

    const onClickTitle = (idx) => {
        setIsModalOpen(true);
        setTaskIndex(idx);
    }

    const renderTasks = filteredData.map((item, idx) => {
        switch (userData?.role) {
            case undefined:
                break;
            case 'unverified':
                return;
            default:
                const userInList = item.participants.some((participant) => participant.split('-')[1] === userData.email);
                const taskIdx = data.map(e => e.id).indexOf(item.id);

                if (hasManagerAccess || userInList) {
                    return <TaskCard key={taskIdx} data={item}
                        onClickTitle={() => onClickTitle(taskIdx)} />
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
            <DropList list={statusOptions} callback={(statusFilter) => {
                if (statusFilter === 'ALL') {
                    return setFilteredData(data);
                }
                setFilteredData(data.filter((item) => item.status === statusFilter))
            }} />
            <div style={{ display: "flex", flexWrap: "wrap" }}>{renderTasks}</div>
        </>
    )
}

export default TasksView