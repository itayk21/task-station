import "./TextInput.css";

const TextInput = ({ label, value, onChange, disabled = false }) => {
  return (
    <div className={`ds-input ${disabled ? "disabled" : ""}`}>
      <label htmlFor="name">{label}</label>
      <input
        type="text"
        required=""
        autoComplete="off"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
