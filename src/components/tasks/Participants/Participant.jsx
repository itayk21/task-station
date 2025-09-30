import styles from "./Participants.module.css";
import { useCallback, useEffect, useState } from "react";

export const convertNameToShortName = (name) => {
  let result = "";
  const splittedName = name.split(" ");
  splittedName.map((shortName) => (result += shortName[0]));

  return result;
};

function getRandomColor() {
  var letters = "BCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

const Participant = ({ name }) => {
  const [color, setColor] = useState(null);
  const shortName = convertNameToShortName(name);

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  return (
    <div className={styles.container} style={{ background: color }}>
      <span className={styles.text}>{shortName}</span>
    </div>
  );
};
export default Participant;
