import { Sidebar } from "./Sidebar/Sidebar";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { findUserById } from "../../lib/firebase/actions";

export const BaseLayout = ({ children }) => {
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

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};
