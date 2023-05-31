import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import styles from "./specializations.module.css";
import { SpecializationsItemModal } from "./specialization-item.modal";

export const SpecializationsItem = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.label}</td>
      <td>
        <div
          className={styles.actionsEdit}
          onClick={() => setIsModalOpen(true)}
        >
          <HiPencil />
        </div>
        <SpecializationsItemModal
          data={data}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </td>
    </tr>
  );
};
