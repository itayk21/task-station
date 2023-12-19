import React, { useEffect, useState } from "react";
import styles from "../Mailbox.module.css";
import { ConversationCard } from "./conversation-card";
import { findConversations } from "../../../lib/firebase/chat-actions";

const Conversations = ({ receiver, sender }) => {
  const [history, setHistory] = useState([]);
  const incomingMessages = Object.values(history || {});
  console.log("#2 - history", incomingMessages);

  useEffect(() => {
    findConversations(sender.id, setHistory);
  }, [receiver, sender]);

  return (
    <div className={styles.left}>
      {incomingMessages.map((incomingMessage) => (
        <ConversationCard
          name={incomingMessage.metadata.name}
          message={
            Object.values(incomingMessages?.[0].messages)[
              Object.values(incomingMessages?.[0].messages).length - 1
            ].message
          }
          date={"SOON, taking the last item and showing as a date"}
        />
      ))}
    </div>
  );
};

export default Conversations;
