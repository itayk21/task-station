import { onValue, ref, push } from "firebase/database";
import { database } from "./index";
export const addConversationItem = (sender, receiver, item) => {
  const senderChatRef = ref(
    database,
    `chats/${sender.id}/${receiver.id}/messages`
  );
  const receiverChatRef = ref(
    database,
    `chats/${receiver.id}/${sender.id}/messages`
  );

  // Push the new message to the 'messages' node in Firebase
  push(receiverChatRef, item);
  push(senderChatRef, item);
};

export const findUserConversationById = (selfId, incomingId, setHistory) => {
  const refVal = ref(database, "chats/" + selfId + "/" + incomingId);

  onValue(
    refVal,
    (snapshot) => {
      let response = snapshot.val();
      setHistory(response);
      return response;
    },
    { onlyOnce: true }
  );
};
