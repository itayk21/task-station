import React from 'react'
import { Header } from '../header/Header'
import Login from './Login'
import Register from './Register'



const Connection = ({ user }) => {
    return (

        <div>
            <div>
                <Header user={user} />
            </div>
            <Login />
            <Register />
        </div>
    )
}

export default Connection