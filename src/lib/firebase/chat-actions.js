import { onValue, ref, push, set } from "firebase/database";
import { database } from "./index";
export const addConversationItem = (sender, receiver, item) => {
  const senderBaseRef = `chats/${sender.id}/${receiver.id}`;
  const receiverBaseRef = `chats/${receiver.id}/${sender.id}`;

  const senderChatRef = ref(database, `${senderBaseRef}/messages`);
  const receiverChatRef = ref(database, `${receiverBaseRef}/messages`);

  const senderChatMetadataRef = ref(database, `${senderBaseRef}/metadata`);
  const receiverChatMetadataRef = ref(database, `${receiverBaseRef}/metadata`);

  set(receiverChatMetadataRef, {
    name: sender.name,
    id: sender.id,
    email: sender.email,
  });

  set(senderChatMetadataRef, {
    name: receiver.name,
    id: receiver.id,
    email: receiver.email,
  });

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

export const findConversations = (selfId, setHistory) => {
  const refVal = ref(database, "chats/" + selfId);

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
