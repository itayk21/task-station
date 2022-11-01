import React, { useEffect, useState } from 'react'
import { generateFutureDate } from '../../lib/date'
import { addNewUser, addNewVerification, findAllUsersUnverified } from '../../lib/firebase/actions'


/**
 * 
 * 1. Admin create magic link (www/?token="12345fffff") -> we creating new database label under "users"
 * 2. User goes to the magic link, and putting email and password -> we creating new user in firebase-auth
 * 3. Admin need to aprrove
 * 
 */

const AddUser = () => {
    const [link, setLink] = useState(window.location.search);
    const [unverified, setUnverified] = useState([]);
    console.log(unverified)

    const onClickSubmit = async () => {
        const id = await addNewVerification({
            verificationDate: generateFutureDate().getTime()
        });

        setLink(id);
    }

    const onClickApprove = (id) => {
        console.log(id)
    }

    const onClick = (id) => {
        console.log(id)
    }

    useEffect(() => {
        findAllUsersUnverified(setUnverified)
    }, []);

    const headers = ['User email', 'UID', 'status']

    return (
        <div>
            <button onClick={onClickSubmit}>Create new link</button>
            <p>{link && JSON.stringify(link)}</p>
            <table>
                <tr>
                    {headers.map((item) => <th>{item}</th>)}
                </tr>
                <tr>
                    {unverified.map((user) => {
                        return <>{Object.values(user).map((item) => <th>{item}</th>)}</>
                    })}
                </tr>
            </table>
        </div >
    )
}

export default AddUser;