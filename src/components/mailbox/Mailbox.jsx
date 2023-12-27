import React, { useContext, useEffect, useState } from "react";
import styles from "./Mailbox.module.css";
import Conversations from "./components/conversations";
import { MailView } from "./components/mail-view";
import { UserContext } from "../layout/Base";
import { findUserById } from "../../lib/firebase/actions";
import { useParams } from "react-router-dom";

const MailboxPage = ({ pageSource }) => {
  const selfUser = useContext(UserContext);
  const [receiverInfo, setReceiverInfo] = useState({});
  const { targetId } = useParams();

  useEffect(() => {
    findUserById(targetId, setReceiverInfo);
  }, [targetId]);

  if (
    (receiverInfo === null && pageSource !== "mainPage") ||
    receiverInfo?.id === selfUser.id
  ) {
    window.open("/mailbox", "_self");
  }

  console.log("receiverInfo", selfUser, receiverInfo);

  // todo:
  // if (selfUser || receiverInfo) return <div>Loading</div>;

  return (
    <div className={styles.container}>
      <Conversations sender={selfUser} receiver={receiverInfo} />
      {pageSource !== "mainPage" && (
        <MailView sender={selfUser} receiver={receiverInfo} />
      )}
    </div>
  );
};

export default MailboxPage;
