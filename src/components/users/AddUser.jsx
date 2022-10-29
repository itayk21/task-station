import React, { useState } from 'react'
import { generateFutureDate } from '../../lib/date'
import { addNewUser, addNewVerification } from '../../lib/firebase/actions'


/**
 * 
 * 1. Admin create magic link (www/?token="12345fffff") -> we creating new database label under "users"
 * 2. User goes to the magic link, and putting email and password -> we creating new user in firebase-auth
 * 3. Admin need to aprrove
 * 
 */

const AddUser = () => {
    const [link, setLink] = useState(window.location.search)

    const onClickSubmit = async () => {
        const id = await addNewVerification({
            verificationDate: generateFutureDate().getTime()
        });

        setLink(id);
    }

    return (
        <div>
            <button onClick={onClickSubmit}>Create new link</button>
            <p>{JSON.stringify(link)}</p>
        </div>
    )
}

export default AddUser;