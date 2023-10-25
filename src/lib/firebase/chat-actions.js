import { onValue, ref, set } from "firebase/database";
import { database } from "./index";
export const addConversationItem = (sender, receiver, history, item) => {
  const response = [...history, item];

  // update sender history
  set(ref(database, `chats/${sender.id}/${receiver.id}`), {
    messages: response,
  });

  // update receiver history
  set(ref(database, `chats/${receiver.id}/${sender.id}`), {
    messages: response,
  });

  return response;
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
