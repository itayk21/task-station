import styles from "../Mailbox.module.css";
import React, { useEffect, useState } from "react";
import MailResponse from "./mail-response";
import MailReply from "./mail-reply";
import {
  addConversationItem,
  findUserConversationById,
} from "../../../lib/firebase/chat-actions";

export const MailView = ({ receiver, sender }) => {
  const [conversationHistory, setConversationHistory] = useState([]);
  const historyArray = Object.values(conversationHistory?.messages || {});

  useEffect(() => {
    findUserConversationById(sender.id, receiver.id, setConversationHistory);
  }, [receiver, sender]);

  const onClickReply = (message) => {
    addConversationItem(sender, receiver, {
      date: new Date().getTime(),
      message,
      sender: {
        name: sender?.name,
        id: sender?.id,
      },
    });

    findUserConversationById(sender.id, receiver.id, setConversationHistory);
  };

  if (!historyArray.length) {
    return (
      <>
        <MailResponse
          title={sender?.name}
          date={new Date().toString()}
          message={null}
        />
        <MailReply onClickReply={onClickReply} />
      </>
    );
  }

  return (
    <div className={styles.right}>
      <div className={styles.mail_responses}>
        {historyArray.map((conversation) => {
          return (
            <MailResponse
              message={conversation.message}
              date={conversation.date}
              title={conversation.sender.name}
            />
          );
        })}
      </div>
      <MailReply onClickReply={onClickReply} />
    </div>
  );
};

/**
 * 1. Create chats under realtime database
 * 2. When clicking send message ->
 * 3. Creating for sender and receiver the message sent under the id of the user
 * 4. inbox: will be all the messages, the mail itself: going to user id, then sender id, and map the array
 *
 *
 * /chats/itzik/itay/[1233-432423-324234-234234, 12332-23-2323-2323]
 * /chats/maor/yuval[12121,12121]
 * /chats/yuval/maor[12212,1212]
 *
 *
 * ------
 *
 *
 * Creating for sender and receiver the message sent under the id of the user
 * id of the user, id of sender
 */
