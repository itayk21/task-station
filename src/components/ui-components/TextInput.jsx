import "./TextInput.css";

const TextInput = ({ label, value, onChange }) => {
  return (
    <div className="ds-input">
      <label htmlFor="name">{label}</label>
      <input
        type="text"
        required=""
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
