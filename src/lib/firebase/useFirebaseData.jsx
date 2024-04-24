import React, { useState, useEffect } from "react";
import { database, firebaseApp } from "./index";
import { ref, get, getDatabase } from "firebase/database";

export const FirebaseRequestStatus = {
  Success: "success",
  Failed: "failed",
  Loading: "loading",
  Fresh: "fresh",
};

const useFirebaseData = (route) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(FirebaseRequestStatus.Fresh);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setStatus(FirebaseRequestStatus.Loading);
      setError("");

      try {
        const db = getDatabase(firebaseApp);
        const dataRef = ref(db, route);
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
          setStatus(FirebaseRequestStatus.Success);
          setData(snapshot.val());
        } else {
          // Data does not exist at the specified location
          setStatus(FirebaseRequestStatus.Success);
          setData("");
        }
      } catch (error) {
        setData(null);
        setError(error.message);
        setStatus(FirebaseRequestStatus.Failed);
      }
    };

    if (route) {
      fetchData();
    }
  }, [route]);

  return { status, data, error };
};

export default useFirebaseData;
