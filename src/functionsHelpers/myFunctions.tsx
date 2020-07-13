const { REACT_APP_BACKEND_URL } = process.env;

export const deleteChat = async (chatId: string) => {
  const res = await fetch(`${REACT_APP_BACKEND_URL}/chat/${chatId}`, {
    method: "DELETE",
  });
  return res.json();
};

export const getUsersList = async (userInput: string) => {
  const res = await fetch(`${REACT_APP_BACKEND_URL}/search?query=${userInput}`);
  return res.json();
};

export type Chat = {
  _id: string;
  usersId: Array<string>;
  length: number;
};

export const getCurrentUserChats = async (currentUserId: string) => {
  const res = await fetch(`${REACT_APP_BACKEND_URL}/chats/${currentUserId}`);
  const chats: Array<Chat> = await res.json();
  return chats;
};

export type ChatPayload = {
  currentUserId: string;
  requestedUserId: string;
};
export const createNewChat = async (payload: ChatPayload) => {
  const res = await fetch(`${REACT_APP_BACKEND_URL}/chat`, {
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
