import { Button } from '@mui/material'
import React, { useState } from 'react'
import { addNewUser } from '../../lib/firebase/actions'
import { logInWithEmailAndPassword, registerWithEmailAndPassword } from '../../lib/firebase/auth'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async () => {
        const res = await registerWithEmailAndPassword(email, password);
        addNewUser({ email: res.user.email, role: 'unverified' }, res.user.uid);
    }

    return (
        <div>
            <div>
                <p>Register</p>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <Button onClick={() => onSubmit()}>Register</Button>
            </div>
        </div>
    )
}

export default Register