//import { getAuth } from 'firebase/auth'
import React from 'react'
import { Route, Router } from "react-router-dom"
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
  // getAuth()
  //   .getUser('XMEwSC8j8DPDnobOckncHB9N0Pp1')
  //   .then((userRecord) => {
  //     // See the UserRecord reference doc for the contents of userRecord.
  //     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
  //   })
  //   .catch((error) => {
  //     console.log('Error fetching user data:', error);
  //   });


  return (
    <>

      <div>Active workers</div>
    </>
  )
}

export default Active_workers
