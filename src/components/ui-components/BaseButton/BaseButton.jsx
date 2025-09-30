const BaseButton = ({ label, onClick }) => {
  return (
    <button className="button-22" onClick={onClick}>
      {label}
    </button>
  );
};

export default BaseButton;
