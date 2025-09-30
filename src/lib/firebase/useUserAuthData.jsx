import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import { auth, database } from "./index";

export const AuthStatus = {
  LOGGED_IN: "loggedIn",
  NOT_LOGGED: "notLogged",
  NOT_EXIST: "notExist",
};

const useAuthData = () => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.NOT_LOGGED);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is logged in
          setAuthStatus(AuthStatus.LOGGED_IN);

          const userRef = ref(database, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            setUserData(null);
            setAuthStatus(AuthStatus.NOT_EXIST);
          }
        } else {
          // User is not logged in
          setUserData(null);
          setAuthStatus(AuthStatus.NOT_LOGGED);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setError(error.message);
      }
    });

    // Cleanup subscription when component unmounts
    return () => unsubscribe();
  }, []);

  return { authStatus, userData, error };
};

export default useAuthData;
