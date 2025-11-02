import { database } from "./index";
import { set, ref, get, onValue, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { sendPasswordResetEmail } from "firebase/auth";

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

export const updateUserByObj = (user, userUpdated) => {
  set(ref(database, "users/" + user.id), { ...user, ...userUpdated });
};

// export const findAllUsers = (setUsers) => {
//   const refVal = ref(database, "users/");
//   let response;

//   onValue(
//     refVal,
//     (snapshot) => {
//       response = snapshot.val();
//       let values = Object.values(response); // turn to array
//       if (values.length) {
//         /* length > 0 */
//         // values = values.filter((user) => {
//         //     return user.work_status !== null
//         // })
//         setUsers(values);
//       }
//     },
//     { onlyOnce: true }
//   );

//   return response;
// };

export const findAllUsers = (setUsers) => {
  const refVal = ref(database, "users/");

  const unsubscribe = onValue(refVal, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      setUsers([]);
      return;
    }

    let users = Object.values(data);

    users = users.map((user) => ({
      ...user,
      role: user.role || "user",
      name: user.name || "Unknown",
      email: user.email || "unknown@email.com",
    }));

    // console.log("findAllUsers -> users array:", users); // <-- גם פה
    setUsers(users);
  });

  return () => {
    // נוח לבטל את ההאזנה כשקומפוננטה מתפרקת
    unsubscribe && unsubscribe();
  };
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

export const findUsersWithSpecifiedRoles = (roles, setState) => {
  const refVal = ref(database, "users/");

  onValue(
    refVal,
    (snapshot) => {
      let response = snapshot.val();
      let values = Object.values(response); // turn to array
      if (values.length) {
        values = values.filter((user) => {
          if (roles.includes(user.role)) {
            return user;
          }
        });
        setState(values);
      }
      return response;
    },
    { onlyOnce: true }
  );
};

export const findAllTasks = (setTasks) => {
  const refVal = ref(database, "tasks/");
  const unsubscribe = onValue(refVal, (snapshot) => {
    const data = snapshot.val() || {};
    const values = Object.values(data);
    setTasks(values);
  });
  return unsubscribe; // החזר כדי שתוכל לעצור ב-unmount
};

export const findUserById = (id, setUserData) => {
  const refVal = ref(database, "users/" + id);

  onValue(
    refVal,
    (snapshot) => {
      let response = snapshot.val();
      console.log("refresh");
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
  return update(ref(database, "tasks/" + id), obj); // merge במקום set
};

export const resetPassword = (auth, email) => {
  updateTask;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Sent successfully");
      return true;
    })
    .catch((error) => {
      console.log(error.code, error.message);
      return false;
    });
};
