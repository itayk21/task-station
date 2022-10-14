import { Button } from '@mui/material'
import React, { useState } from 'react'
import { logInWithEmailAndPassword, registerWithEmailAndPassword } from '../../lib/firebase/auth'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
            <div>
                <p>register</p>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <Button onClick={() => registerWithEmailAndPassword(email, password)}>Register</Button>
            </div>
        </div>
    )
}

export default Register