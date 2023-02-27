import React, { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { findUserById } from "../lib/firebase/actions";
import { auth } from "../lib/firebase";

export const UserContext = createContext();

export const useUserAuth = () => {
  /*
1. to lookup in DB on users table
2. to get the role of the user by the id
3. put it on a global state
*/
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    // user UID that we are getting from firebase SDK
    const userUID = user?.uid;

    if (userUID) {
      // when we having the user UID,
      // we fetching to see his data from database
      findUserById(userUID, setUserData);
    }
  }, [user]);

  // If there is no user data, or user role value
  // redirect them to login page.
  if (!user || !userData?.role) {
    setUserData(false);
  }

  return { userData, user };
};
