import { onValue, ref, set } from "firebase/database";
import { database } from "./index";

export const createConversation = (sender, receiver) => {
  set(ref(database, `chats/${sender.id}/${receiver.id}`), { messages: [] });
};

export const addConversationItem = (sender, receiver, history, item) => {
  if (!history) {
    createConversation(sender, receiver);
  }

  //history.messages.push(item)
  // history.messages.push(item)

  // update sender history
  set(ref(database, `chats/${sender.id}/${receiver.id}`), { name: "test" });

  // update receiver history
  set(ref(database, `chats/${receiver.id}/${sender.id}`), { name: "b" });
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
