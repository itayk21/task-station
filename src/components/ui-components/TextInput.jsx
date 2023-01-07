import './TextInput.css';

const TextInput = ({label, value, onChange}) => {
    return (
        <div className="inputGroup">
            <input type="text" required="" autoComplete="off" value={value} onChange={onChange}/>
            <label htmlFor="name">{label}</label>
        </div>
        )
}

export default TextInput;
