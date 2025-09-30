import SelectInput from "../../../ui-components/SelectInput";
import { useEffect, useState } from "react";
import {
  findUsersWithSpecifiedRoles,
  updateUserByObj,
} from "../../../../lib/firebase/actions";
import { SystemAuthRoles } from "../../../../lib/utils/config";

const managerList = ({ user }) => {
  const [currentManagerList, setCurentManagerList] = useState([]);
  const [currentManagerChoosen, setCurrentManagerChoosen] = useState(
    user.manager
  );

  useEffect(() => {
    findUsersWithSpecifiedRoles(SystemAuthRoles.MANAGER, setCurentManagerList);
  }, []);

  const managersAsInputList = currentManagerList?.map((user) => {
    return {
      label: user.name,
      value: user.id,
    };
  });

  const onManagerChange = (e) => {
    updateUserByObj(user, { manager: e.target.value });
    setCurrentManagerChoosen(e.target.value);
  };

  return (
    <div>
      <SelectInput
        list={managersAsInputList}
        defaultText={
          currentManagerChoosen ? currentManagerChoosen : "No manager"
        }
        value={currentManagerChoosen ? currentManagerChoosen : null}
        onChange={onManagerChange}
      />
    </div>
  );
};

export default managerList;
