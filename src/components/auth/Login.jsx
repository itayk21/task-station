import { Button } from '@mui/material'
import React, { useState } from 'react'
import { logInWithEmailAndPassword } from '../../lib/firebase/auth'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>

      <div>

        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={() => logInWithEmailAndPassword(email, password)}>Login</Button>
      </div>
    </div>
  )
}

export default Login