import React from "react";

const TextArea = (props) => {
  return (
    <div className="inputGroup">
      {!props.showLabel && <label htmlFor={props.name}>{props.label}</label>}
      <textarea
        name={props.name}
        cols="69"
        rows="3"
        onChange={props.onChange}
        disabled={props.isDisabled}
        value={props.value}
      ></textarea>
    </div>
  );
};

export default TextArea;
