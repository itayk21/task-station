import "./SelectInput.css";

const SelectInput = ({
  disabled,
  value,
  onChange,
  list,
  defaultText,
  addFirstSelection = false,
}) => {
  if (addFirstSelection) {
    list = [{ label: "No selection", value: "noselection" }, ...list];
  }

  return (
    <select
      className="theme__select_input"
      onChange={onChange}
      value={value}
      disabled={disabled}
    >
      <option value="" selected disabled hidden>
        {defaultText}
      </option>
      {list.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
