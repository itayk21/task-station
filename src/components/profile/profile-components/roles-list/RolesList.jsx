import SelectInput from "../../../ui-components/SelectInput";
import { SystemAuthRoles } from "../../../../lib/utils/config";
import { useState } from "react";
import { updateUserRole } from "../../../../lib/firebase/actions";

const list = [
  { label: SystemAuthRoles.ADMINSTRATOR, value: SystemAuthRoles.ADMINSTRATOR },
  { label: SystemAuthRoles.USER, value: SystemAuthRoles.USER },
  { label: SystemAuthRoles.MANAGER, value: SystemAuthRoles.MANAGER },
];

const RolesList = ({ user }) => {
  const [currentRole, setCurrentRole] = useState(user.role);

  const onChangeRole = (choosenRole) => {
    const roleValue = choosenRole.target.value;
    setCurrentRole(roleValue);
    updateUserRole(user, roleValue);
  };

  return (
    <div>
      <SelectInput
        list={list}
        defaultText={currentRole}
        value={currentRole}
        onChange={onChangeRole}
      />
    </div>
  );
};

export default RolesList;
