import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkoi1myyxtrDrw7m6ioxsR1wreCjEb6hw",
  authDomain: "taskstation-79d78.firebaseapp.com",
  databaseURL: "https://taskstation-79d78-default-rtdb.firebaseio.com",
  projectId: "taskstation-79d78",
  storageBucket: "taskstation-79d78.appspot.com",
  messagingSenderId: "488227377765",
  appId: "1:488227377765:web:f16b368cb559aa2aa8ac8c",
  measurementId: "G-ET01ZRJ5SQ",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const database = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);
