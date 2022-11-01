import React, { useEffect, useState } from 'react'
import { generateFutureDate } from '../../lib/date'
import { addNewUser, addNewVerification, findAllUsersUnverified, updateUserRole } from '../../lib/firebase/actions'


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

    const onClickSubmit = async () => {
        const id = await addNewVerification({
            verificationDate: generateFutureDate().getTime()
        });

        setLink(`${window.location.href}?token=${id}`);
    }

    const onClickApprove = (obj) => {
        updateUserRole(obj, 'user');

        // Remove the item after we approve it
        setUnverified(prevState => prevState.filter((item) => {
            item.id !== obj.id
        }));
    }

    const onClickCancel = (obj) => {
        updateUserRole(obj, 'canceled');

        // Remove the item after we approve it
        setUnverified(prevState => prevState.filter((item) => {
            item.id !== obj.id
        }));
    }

    useEffect(() => {
        findAllUsersUnverified(setUnverified)
    }, []);

    const headers = ['Date', 'Email', 'UID', 'Name', 'Phone', 'Status', 'Actions']

    return (
        <div>
            <button onClick={onClickSubmit}>Create new link</button>
            <p >{link && link}</p>
            <button onClick={() => { navigator.clipboard.writeText(link) }}>Copy</button>
            <table>
                <tr>
                    {headers.map((item) => <th>{item}</th>)}
                </tr>
                <tr>
                    {unverified.map((user) => {
                        return <>
                            {Object.values(user).map((item) => <th>{item}</th>)}
                            <th><button onClick={() => onClickApprove(user)}>&#10003;</button>
                                <button onClick={() => onClickCancel(user)}>&#128473;</button></th>
                        </>
                    })}
                </tr>
            </table>
        </div >
    )
}

export default AddUser;