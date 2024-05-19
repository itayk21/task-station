import { Header } from "../header/Header";

import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { UserContext } from "../layout/Base";
import { useNavigate, useParams } from "react-router-dom";
import { findUserById } from "../../lib/firebase/actions";
import DetailsField from "../tasks/DetailsField/DetailsField";
import TextInput from "../ui-components/TextInput";
import { convertNameToShortName } from "../tasks/Participants/Participant";
import { SystemAuthRoles } from "../../lib/utils/config";
import { useUserAuth } from "../../hooks/useUserAuth";
import RolesList from "./profile-components/roles-list/RolesList";
import ManagerList from "./profile-components/manager-list/ManagerList";
import BaseButton from "../ui-components/BaseButton/BaseButton";

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
  const navigate = useNavigate();
  const viewingUserData = useContext(UserContext);

  const [userProfileData, setUserProfileData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const specializationValue = userProfileData?.specialization
    ? userProfileData.specialization
    : "No specialization";

  const shortName =
    userProfileData?.name && convertNameToShortName(userProfileData.name);
  const isAdmininstrator =
    viewingUserData?.role === SystemAuthRoles.ADMINSTRATOR;
  // && viewingUserData?.id !== userProfileData?.id;

  useEffect(() => {
    findUserById(id, setUserProfileData);
  }, []);

  const handleNavigation = () => {
    navigate(`/mailbox/${id}`);
  };

  if (!userProfileData) {
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
          <TextInput disabled={!isEditMode} value={userProfileData.name} />
        </DetailsField>

        <DetailsField label="Specialization">
          <TextInput disabled={!isEditMode} value={specializationValue} />
        </DetailsField>

        <DetailsField label="Role">
          {isAdmininstrator ? (
            <RolesList user={userProfileData} />
          ) : (
            <TextInput disabled={!isEditMode} value={userProfileData.role} />
          )}
        </DetailsField>

        <DetailsField label="Manager">
          {isAdmininstrator ? (
            <ManagerList user={userProfileData} />
          ) : (
            <TextInput
              disabled={!isEditMode}
              value={
                userProfileData?.manager
                  ? userProfileData.manager
                  : "No manager"
              }
            />
          )}
        </DetailsField>

        <DetailsField label="Email">
          <TextInput disabled={!isEditMode} value={userProfileData.email} />
        </DetailsField>

        <DetailsField label="Phone">
          <TextInput
            disabled={!isEditMode}
            value={userProfileData.phoneNumber}
          />
        </DetailsField>
      </main>

      <footer>
        <BaseButton label={"Send message"} onClick={handleNavigation} />
      </footer>
    </div>
  );
};

export default Profile;
