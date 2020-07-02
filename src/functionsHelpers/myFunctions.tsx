const REQUEST_URL = "http://localhost:5151/messages/";

export type Chat = {
  _id: string;
  usersId: Array<string>;
  length: number;
};
export const getCurrentUserMessagesAsync = async (currentUserId: string) => {
  let res = await fetch(`${REQUEST_URL}user/${currentUserId}`);
  const chats: Array<Chat> = await res.json();
  return chats;
};

//
export type ChatPayload = {
  currentUserId: string;
  requestedUserId: string;
};
export const createNewChatAsync = async (payload: ChatPayload) => {
  const res = await fetch(`${REQUEST_URL}create-new-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export type User = {
  uid: string | undefined;
  firstName: string;
  lastName: string;
  phone: number;
};
export const registerUser = async (payload: User) => {
  const res = await fetch(`http://localhost:5151/users/new-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};
