import React, { useState } from "react";
import styles from "./specializations.module.css";
import { SpecializationsItem } from "./components/specialization-item";

/*
    1. add to firebase a new table called "specializations"
    2. every "specializations" item has: { label: "Frontend Developer", value: "frontend" }
    3. in this page we show a list of the specializations with option to add new one or modify or delete.
 */
const Specializations = () => {
  const [specializations, setSpecializations] = useState([
    { id: 1, label: "Production worker", value: "production" },
    { id: 2, label: "Cool Engineer", value: "engineer" },
  ]);

  if (!specializations.length) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <th>ID</th>
          <th>Specializations</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {specializations.map((item) => {
            return <SpecializationsItem data={item} key={item.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Specializations;
