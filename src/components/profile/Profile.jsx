import { Header } from "../header/Header";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";

const getColorByStatus = (type) => {
  if (type === "ONLINE") {
    return "green";
  }
  if (type === "BREAK") {
    return "yellow";
  }
  if (type === "OFFLINE") {
    return "red";
  }
  return "red";
};

const Profile = () => {
  const userContext = useContext(UserContext);
  const [statusColor, setStatusColor] = useState(
    getColorByStatus(userContext.work_status)
  );

  useEffect(() => {
    setStatusColor(getColorByStatus(userContext.work_status));
  }, [userContext]);

  return (
    <div className={styles.container}>
      <header>
        <div>
          <div className={styles.profile_img}></div>
        </div>
        <div className={styles.profile_name_and_description}>
          <h1>
            {userContext.name}
            <span
              className={styles.online_status}
              style={{
                background: statusColor,
              }}
            ></span>
          </h1>
          <p>working as FE</p>
        </div>
      </header>

      <main></main>

      <footer></footer>
    </div>
  );
};

export default Profile;
