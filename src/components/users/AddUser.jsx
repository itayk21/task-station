import React, { useEffect, useState } from "react";
import { generateFutureDate } from "../../lib/date";
import {
  addNewUser,
  addNewVerification,
  findAllUsersUnverified,
  updateUserRole,
} from "../../lib/firebase/actions";
import styles from "./AddUser.module.css";
import { FaWhatsapp } from "react-icons/fa";

/**
 *
 * 1. Admin create magic link (www/?token="12345fffff") -> we creating new database label under "users"
 * 2. User goes to the magic link, and putting email and password -> we creating new user in firebase-auth
 * 3. Admin need to aprrove
 *
 */

const AddUser = () => {
  const [link, setLink] = useState(window.location.search);
  const [unverified, setUnverified] = useState([]);
  const [numberToSend, setNumberToSend] = useState("");

  const onClickSubmit = async () => {
    const id = await addNewVerification({
      verificationDate: generateFutureDate().getTime(),
    });

    setLink(`${window.location.origin}/register?token=${id}`);
  };

  const onClickApprove = (obj) => {
    updateUserRole(obj, "user");

    // Remove the item after we approve it
    setUnverified((prevState) =>
      prevState.filter((item) => {
        return item.id !== obj.id;
      })
    );
  };

  const onClickCancel = (obj) => {
    updateUserRole(obj, "canceled");

    // Remove the item after we approve it
    setUnverified((prevState) =>
      prevState.filter((item) => {
        return item.id !== obj.id;
      })
    );
  };

  useEffect(() => {
    findAllUsersUnverified(setUnverified);
  }, []);

  const headers = [
    "Date",
    "Email",
    "UID",
    "Name",
    "Phone",
    "Status",
    "Specialization",
    "Actions",
  ];

  return (
    <section className={styles.container}>
      <div className={styles.block_container}>
        <h1>Order new team-member:</h1>
        <button className={styles.button} onClick={onClickSubmit}>
          Create new link
        </button>
      </div>
      <div>
        <input className={styles.input_link} type="text" value={link} />
        <button
          className={`${styles.button_space} ${styles.button}`}
          onClick={() => {
            navigator.clipboard.writeText(link);
          }}
        >
          Copy
        </button>
      </div>

      <div>
        <input
          className={styles.input_link}
          type="text"
          placeholder="please enter number"
          value={numberToSend}
          onChange={(e) => setNumberToSend(e.target.value)}
        />
        <a
          className={`${styles.button_space} ${styles.button}`}
          target={"_blank"}
          href={`https://api.whatsapp.com/send?phone=972${numberToSend.substring(
            1
          )}&text=${link}`}
        >
          {" "}
          <FaWhatsapp />{" "}
        </a>
      </div>

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
            {unverified.map((user) => {
              return (
                <tr>
                  {Object.values(user).map((item) => (
                    <td>{item}</td>
                  ))}
                  <td>
                    <button
                      className={styles.approve}
                      onClick={() => onClickApprove(user)}
                    >
                      &#10003;
                    </button>
                    <button
                      className={styles.cancel}
                      onClick={() => onClickCancel(user)}
                    >
                      &#128473;
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AddUser;
