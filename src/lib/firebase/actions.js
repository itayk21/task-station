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

export const addNewTask = async (item) => {
    const debugItem = { name: 'task01', description: 'this is a test task', date: new Date(), time: new Date().getHours(), participants: ["aaa"], specialization: "create" }

    const newId = uuidv4();
    set(ref(database, 'tasks/' + newId), item || debugItem);
}