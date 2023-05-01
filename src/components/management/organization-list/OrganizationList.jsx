import GenericTable from "../../ui-components/GenericTable/GenericTable";
import { useEffect, useState } from "react";
import React from "react";
import {
  findAllUsers,
  findUserById,
  findUserByIdAndGiveName,
} from "../../../lib/firebase/actions";
import SelectInput from "../../ui-components/SelectInput";
import { SystemAuthRoles } from "../../../lib/utils/config";

const OrganizationList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedManager, setSelectedManager] = useState(null);
  const managers = getManagersFromUsers(users);

  useEffect(() => {
    findAllUsers(setUsers);
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // const findManagerName = () => {
  //   return console.log("manager test", user.name);
  // };

  const columns = [
    { label: "Name", key: "name" },
    { label: "Mail", key: "email" },
    { label: "Phone number", key: "phone" },
    { label: "Date of birth", key: "dateOfBirth" },
    { label: "Job specialization", key: "specialization" },
  ];

  const onChangeManager = (e) => {
    setSelectedManager(e.target.value);

    if (e.target.value === "noselection") {
      return setFilteredUsers(users);
    }

    const usersWithManagerName = users.filter((user) => {
      return user.manager === e.target.value;
    });
    setFilteredUsers(usersWithManagerName);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <p>Filter by Manager:</p>
          <SelectInput
            addFirstSelection={true}
            list={managers}
            defaultText={selectedManager || "No selected"}
            value={selectedManager || null}
            onChange={onChangeManager}
          />
        </div>
      </div>
      <GenericTable
        columns={columns}
        items={filteredUsers}
        clickRowFeature={{ key: "name", baseUrl: "profile", idKey: "id" }}
      />
    </div>
  );
};
export default OrganizationList;

const getManagersFromUsers = (users) => {
  return users
    .filter((user) => {
      return user.role === SystemAuthRoles.MANAGER;
    })
    .map((user) => {
      return {
        label: user.name,
        value: user.id,
      };
    });
};
