const { REACT_APP_BACKEND_URL } = process.env;

export const deleteChat = async (chatId: string) => {
  const res = await fetch(
    `${REACT_APP_BACKEND_URL}/messages/delete-chat/${chatId}`
  );
  return res.json();
};

export const getUsersList = async (userInput: string) => {
  let res = await fetch(`${REACT_APP_BACKEND_URL}/search?query=${userInput}`);
  return res.json();
};

export const getChat = async (chatId: string) => {
  let res = await fetch(`${REACT_APP_BACKEND_URL}/chats/chat/${chatId}`);
  return res.json();
};

export type Chat = {
  _id: string;
  usersId: Array<string>;
  length: number;
};
export const getCurrentUserChats = async (currentUserId: string) => {
  const res = await fetch(`${REACT_APP_BACKEND_URL}/user/${currentUserId}`);
  const chats: Array<Chat> = await res.json();
  return chats;
};

//
export type ChatPayload = {
  currentUserId: string;
  requestedUserId: string;
};
export const createNewChatAsync = async (payload: ChatPayload) => {
  const res = await fetch(`${REACT_APP_BACKEND_URL}/create-new-chat`, {
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
  const res = await fetch(`${REACT_APP_BACKEND_URL}/users/new-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};
