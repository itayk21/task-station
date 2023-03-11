import { Header } from "../header/Header";

import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { UserContext } from "../layout/Base";
import { useParams } from "react-router-dom";
import { findUserById } from "../../lib/firebase/actions";
import DetailsField from "../tasks/DetailsField/DetailsField";
import TextInput from "../ui-components/TextInput";
import { convertNameToShortName } from "../tasks/Participants/Participant";

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
  let { id } = useParams();
  const [user, setUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const specializationValue = user?.specialization
    ? user.specialization
    : "No specialization";

  const shortName = user?.name && convertNameToShortName(user.name);

  useEffect(() => {
    findUserById(id, setUser);
  }, []);

  if (!user) {
    return <div>Cannot find user. Please try again later.</div>;
  }

  return (
    <div className={styles.container}>
      <header>
        <div>
          <div className={styles.profile_img}>{shortName}</div>
        </div>
        <div className={styles.profile_name_and_description}>
          <h1>Profile</h1>
          <p>Details about an user in TaskStation system.</p>
        </div>
      </header>

      <main>
        <DetailsField label="Name">
          <TextInput disabled={!isEditMode} value={user.name} />
        </DetailsField>

        <DetailsField label="Specialization">
          <TextInput disabled={!isEditMode} value={specializationValue} />
        </DetailsField>

        <DetailsField label="Role">
          <TextInput disabled={!isEditMode} value={user.role} />
        </DetailsField>

        <DetailsField label="Maneger">
          <TextInput
            disabled={!isEditMode}
            value={user?.manager ? user.manager : "No manager"}
          />
        </DetailsField>

        <DetailsField label="Email">
          <TextInput disabled={!isEditMode} value={user.email} />
        </DetailsField>

        <DetailsField label="Phone">
          <TextInput disabled={!isEditMode} value={user.phoneNumber} />
        </DetailsField>
      </main>

      <footer></footer>
    </div>
  );
};

export default Profile;
