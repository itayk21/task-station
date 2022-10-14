import React from 'react'
import styles from './style.css'
import logo from '../../assets/images/logo2.png'
import { Button } from '@mui/material'
import { disconnect } from '../../lib/firebase/auth'





export const Header = ({ user }) => {
    return (
        <div className='header'>
            <img className='logo' src={logo} alt='logo' />

            {!!user && <div>
                <button className='disconnectButton' onClick={() => {
                    disconnect()
                }}>Disconect {user.email}</button>
            </div>}

        </div>
    )

}


