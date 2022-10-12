import { database } from './index';
import { set, ref } from "firebase/database"

/*
    name: string,
    description: string,
    date: date,
    participants: array,
    specialization: string,
    notes: array
*/

export const addNewTask = () => {
    set(ref(database, 'tasks/' + '001'), {
        test: true,

    });

}