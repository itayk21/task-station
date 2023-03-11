//import { getAuth } from 'firebase/auth'
import React, { useState, useEffect, useContext } from "react";
import { findAllUsers } from "../../lib/firebase/actions";
import styles from "./ActiveWorkers.module.css";
import { format } from "date-fns";

/*
Roles: ['user', 'manager', 'admin']

admin: everything
manager: add new tasks, update, cancel tasks
user: update tasks only, mail 

1. Get all users from database
2. To concat only the users, and managers/admin
3. Show them in diffrent list
*/

const Active_workers = () => {
  const headers = ["Time", "Name", "Status"];
  const [users, setUsers] = useState([]);

  const returnByValues = (item, values) => {
    const newItem = {};

    // Running on each value, and taking the value
    // from the item, and injecting it to the newItem object
    values.forEach((value) => {
      newItem[value] = item[value];
    });

    return newItem;
  };

  useEffect(() => {
    findAllUsers(setUsers);
    const findInterval = setInterval(() => {
      findAllUsers(setUsers);
    }, 3000);

    // When we are using return on useEffect with
    // clear interval, it will delete the interval
    // when we moving between pages in the componens
    // in othe words, it will stop the interval on destroy.
    return () => {
      clearInterval(findInterval);
    };
  }, []);

  return (
    <div className={styles.tablePlace}>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              {headers.map((item) => (
                <th>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              if (
                user.status === "canceled" ||
                !user.work_status ||
                user.work_status === "OFFLINE"
              ) {
                return;
              }

              user = returnByValues(user, [
                "last_work_status",
                "name",
                "work_status",
              ]);
              const date = new Date(user.last_work_status);
              user.last_work_status = format(date, "hh:mm");

              return (
                <tr>
                  {Object.values(user).map((item, idx) => {
                    if (idx === 2) {
                      return (
                        <td
                          className={`option_${user.work_status.toLowerCase()}`}
                        >
                          {item}
                        </td>
                      );
                    }

                    return <td>{item}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Active_workers;
