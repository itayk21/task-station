import React, { useState, useEffect } from 'react'
import { findVerificationById } from '../../lib/firebase/actions'
import { Header } from '../header/Header'
import Login from './Login'
import Register from './Register'
import { compareTwoDates } from '../../lib/date/index'


const Connection = ({ user }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const isRegisterMode = searchParams.get('token');
    const [isValidToken, setIsValidToken] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isRegisterMode) {
            const res = findVerificationById(isRegisterMode)
            if (!res?.verificationDate) {
                setIsValidToken(false);
                return;
            }
            const isValid = compareTwoDates(new Date().getTime(), res?.verificationDate)
            setIsValidToken(isValid);
        }
    }, [isLoading])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [])


    if (isLoading) {
        return <div>Loading..</div>
    }

    return (

        <>
            <div>
                <Header user={user} />
            </div>
            {!isRegisterMode && <Login />}
            {isRegisterMode && isValidToken && <Register verificationId={isRegisterMode} />}
            {isRegisterMode && !isValidToken && <div>This token is expired. Please contct your manager.</div>}
        </ >
    )
}

export default Connection