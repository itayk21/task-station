import React, { useState } from "react";

function MultipleSelectionNew() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    let updatedSelection = [];

    if (checked) {
      updatedSelection = [...selectedOptions, value];
    } else {
      updatedSelection = selectedOptions.filter((option) => option !== value);
    }

    setSelectedOptions(updatedSelection);
  };

  const handleRemove = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  return (
    <>
      <label>
        <input
          type="checkbox"
          value="option1"
          checked={selectedOptions.includes("option1")}
          onChange={handleSelect}
        />
        Option 1
        {selectedOptions.includes("option1") && (
          <button onClick={() => handleRemove("option1")}>Remove</button>
        )}
      </label>
      <label>
        <input
          type="checkbox"
          value="option2"
          checked={selectedOptions.includes("option2")}
          onChange={handleSelect}
        />
        Option 2
        {selectedOptions.includes("option2") && (
          <button onClick={() => handleRemove("option2")}>Remove</button>
        )}
      </label>
      <label>
        <input
          type="checkbox"
          value="option3"
          checked={selectedOptions.includes("option3")}
          onChange={handleSelect}
        />
        Option 3
        {selectedOptions.includes("option3") && (
          <button onClick={() => handleRemove("option3")}>Remove</button>
        )}
      </label>
    </>
  );
}

export default MultipleSelectionNew;
