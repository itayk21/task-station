import React, { useContext, useState } from 'react'
import styles from './style.css'
import logo from '../../assets/images/logo2.png'
import { Button } from '@mui/material'
import { disconnect } from '../../lib/firebase/auth'
import { UserContext } from '../../App'
import DropList from '../tasks/DropList';
import { updateUserWorkStatus } from '../../lib/firebase/actions'

const statusList = [{
    value: 'UNAVAILABLE',
    label: 'Unavailable'
}, {
    value: 'ONLINE',
    label: 'Online'
}, {
    value: 'BREAK',
    label: 'Break',
}];

export const Header = ({ user }) => {

    const userData = useContext(UserContext);
    const [selectValue, setSelectValue] = useState(userData.work_status || "");



    const onStatusChange = (e) => {
        setSelectValue(e.target.value);
        updateUserWorkStatus(userData, e.target.value);
        console.log("userData", userData)
    }

    const toggleWorkStatus = () => {
        if (selectValue === 'OFFLINE') {
            updateUserWorkStatus(userData, 'ONLINE');
            setSelectValue('ONLINE');
        } else {
            updateUserWorkStatus(userData, 'OFFLINE');
            setSelectValue('OFFLINE');
        }
    }

    return (
        <div className='header'>
            <img className='logo' src={logo} alt='logo' />

            {!!user && <div>
                <button className='disconnectButton' onClick={() => {
                    disconnect()
                }}>Disconect {userData.name}</button>

                <select onChange={onStatusChange} value={selectValue} disabled={selectValue === 'OFFLINE'}>
                    {statusList.map((item) => <option value={item.value}>{selectValue === 'OFFLINE' ? "OFFLINE" : item.label}</option>
                    )}
                </select>

                <button onClick={toggleWorkStatus}>{selectValue === 'OFFLINE' ? "Login work" : "Logout work"}</button>
            </div>}

        </div>
    )

}


