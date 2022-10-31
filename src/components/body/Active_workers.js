//import { getAuth } from 'firebase/auth'
import React, { useContext } from 'react'
import { Route, Router } from "react-router-dom"
import { UserContext } from '../../App'
//import { getFirebaseAuth } from '../../lib/firebase/auth'

/*
Roles: ['user', 'manager', 'admin']

admin: everything
manager: add new tasks, update, cancel tasks
user: update tasks only, mail 

1. Get all users from system
2. To concat only the users, and managers/admin
3. Show them in diffrent list
*/

const Active_workers = () => {


  return (
    <>
      <div>Active workers</div>
      <ul>
        <li>user1 | V | X</li>
      </ul>
    </>
  )
}

export default Active_workers
