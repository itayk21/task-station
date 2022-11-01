import React, { useContext } from 'react'
import styles from './style.css'
import logo from '../../assets/images/logo2.png'
import { Button } from '@mui/material'
import { disconnect } from '../../lib/firebase/auth'
import { UserContext } from '../../App'

export const Header = ({ user }) => {

    const userData = useContext(UserContext);

    return (
        <div className='header'>
            <img className='logo' src={logo} alt='logo' />

            {!!user && <div>
                <button className='disconnectButton' onClick={() => {
                    disconnect()
                }}>Disconect {userData.name}</button>
            </div>}

        </div>
    )

}


