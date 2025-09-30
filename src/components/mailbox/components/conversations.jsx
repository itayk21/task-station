import React, { useEffect, useState } from "react";
import styles from "../Mailbox.module.css";
import { ConversationCard } from "./conversation-card";
import { findConversations } from "../../../lib/firebase/chat-actions";
import { formatTimestampToDate } from "../../../lib/date";

const Conversations = ({ receiver, sender }) => {
  const [history, setHistory] = useState([]);
  const incomingMessages = Object.values(history || {});
  console.log("receiver", receiver, sender);

  useEffect(() => {
    findConversations(sender.id, setHistory);
  }, [receiver, sender]);

  const conversationsData = incomingMessages.map((item, idx) => {
    const currentItemAsObject = Object.values(incomingMessages?.[idx].messages);

    return {
      name: item.metadata.name,
      message: currentItemAsObject[currentItemAsObject.length - 1].message,
      date: formatTimestampToDate(
        currentItemAsObject[currentItemAsObject.length - 1].date
      ),
      user_id: item.metadata.id,
    };
  });

  return (
    <div className={styles.left}>
      {conversationsData.map((conversation, idx) => (
        <ConversationCard
          name={conversation.name}
          message={conversation.message}
          date={conversation.date}
          userId={conversation.user_id}
        />
      ))}
    </div>
  );
};

export default Conversations;
