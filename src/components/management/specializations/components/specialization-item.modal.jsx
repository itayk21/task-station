import { ActionModal } from "../../../ui-components/ActionModal/ActionModal";
import React from "react";
import TextInput from "../../../ui-components/TextInput";
import BaseButton from "../../../ui-components/BaseButton/BaseButton";

export const SpecializationsItemModal = ({
  isModalOpen,
  setIsModalOpen,
  data,
}) => {
  return (
    <ActionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <div>
        To which label to you want to change this current specialization?
      </div>
      <div>
        <TextInput label={"specialization"} value={data.label} />
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <BaseButton label={"Save"} />
        <BaseButton label={"Cancel"} onClick={() => setIsModalOpen(false)} />
      </div>
    </ActionModal>
  );
};
