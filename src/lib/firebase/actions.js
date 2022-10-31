import { database } from './index';
import { set, ref, get, onValue, update } from "firebase/database"
import { v4 as uuidv4 } from 'uuid';

/*
    name: string,
    description: string,
    date: date,
    participants: array,
    specialization: string,
    notes: array
*/

export const findUserById = (id, setUserData) => {
    const refVal = ref(database, 'users/' + id);

    onValue(refVal, (snapshot) => {
        let response = snapshot.val()
        setUserData(response);
        return response;
    }, { onlyOnce: true });
}

export const addNewVerification = async (item) => {
    const newId = uuidv4();
    set(ref(database, 'verifications/' + newId), { ...item, id: newId });
    return newId;
}

export const findVerificationById = (id) => {
    const refVal = ref(database, 'verifications/' + id);
    let response;

    onValue(refVal, (snapshot) => response = snapshot.val());

    return response;
}

export const addNewUser = async (item, optionalID) => {
    const newId = optionalID || uuidv4();
    set(ref(database, 'users/' + newId), { ...item, id: newId });
    return newId;
}

export const addNewTask = async (item) => {
    const debugItem = { name: 'task01', description: 'this is a test task', date: new Date(), time: new Date().getHours(), participants: ["aaa"], specialization: "create" }

    const newId = uuidv4();
    set(ref(database, 'tasks/' + newId), { ...item, id: newId } || debugItem);
}

export const findAllTasks = () => {
    const refVal = ref(database, 'tasks/');
    let response;

    onValue(refVal, (snapshot) => response = snapshot.val());

    return response;
}

export const updateTask = (id, obj) => {
    set(ref(database, 'tasks/' + id), obj);
}
