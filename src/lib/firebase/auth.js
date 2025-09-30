import { auth } from "./index"

import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import { addNewUser } from "./actions";

export const getFirebaseAuth = getAuth;

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const registerWithEmailAndPassword = async (email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

export const disconnect = async () => {
    try {
        return await signOut(auth);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

