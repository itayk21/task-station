import { database } from "./index";
import { set, ref, get, onValue, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

export const removeVerification = (id) => {
  set(ref(database, "verifications/" + id), null);
};

export const updateUserWorkStatus = (obj, work_status) => {
  set(ref(database, "users/" + obj.id), {
    ...obj,
    work_status,
    last_work_status: Date.now(),
  });
};

export const updateUserRole = (obj, role) => {
  set(ref(database, "users/" + obj.id), { ...obj, role });
};

export const findAllUsers = (setUsers) => {
  const refVal = ref(database, "users/");
  let response;

  onValue(
    refVal,
    (snapshot) => {
      response = snapshot.val();
      let values = Object.values(response); // turn to array
      if (values.length) {
        /* length > 0 */
        // values = values.filter((user) => {
        //     return user.work_status !== null
        // })
        setUsers(values);
      }
    },
    { onlyOnce: true }
  );

  return response;
};

export const findAllUsersUnverified = (setUnverified) => {
  const refVal = ref(database, "users/");

  onValue(
    refVal,
    (snapshot) => {
      let response = snapshot.val();
      let values = Object.values(response); // turn to array
      if (values.length) {
        /* length > 0 */
        values = values.filter((user) => {
          return user.role === "unverified";
        });
        setUnverified(values);
      }
      return response;
    },
    { onlyOnce: true }
  );
};

export const findAllTasks = (setTasks) => {
  const refVal = ref(database, "tasks/");

  onValue(
    refVal,
    (snapshot) => {
      let response = snapshot.val();
      let values = Object.values(response); // turn to array
      if (values.length) {
        setTasks(values);
        return values;
      }
    },
    { onlyOnce: true }
  );
};

export const findUserById = (id, setUserData) => {
  const refVal = ref(database, "users/" + id);

  onValue(
    refVal,
    (snapshot) => {
      let response = snapshot.val();
      setUserData(response);
      return response;
    },
    { onlyOnce: true }
  );
};

export const addNewVerification = async (item) => {
  const newId = uuidv4();
  set(ref(database, "verifications/" + newId), { ...item, id: newId });
  return newId;
};

export const findVerificationById = (id) => {
  const refVal = ref(database, "verifications/" + id);
  let response;

  onValue(refVal, (snapshot) => (response = snapshot.val()));

  return response;
};

export const addNewUser = async (item, optionalID) => {
  const newId = optionalID || uuidv4();
  set(ref(database, "users/" + newId), { ...item, id: newId });
  return newId;
};

export const addNewTask = async (item) => {
  const debugItem = {
    name: "task01",
    description: "this is a test task",
    date: new Date(),
    time: new Date().getHours(),
    participants: ["aaa"],
    specialization: "create",
  };

  const newId = uuidv4();
  set(ref(database, "tasks/" + newId), { ...item, id: newId } || debugItem);
};

export const updateTask = (id, obj) => {
  set(ref(database, "tasks/" + id), obj);
};
