import React, { useEffect, useReducer, Reducer, useCallback } from "react";
import localForage from "localforage";
import io from "socket.io-client";
import { MessageView, Message } from "../../../components/message";
import "./index.css";

type Props = {
  userId: string;
  chatId: string | null;
};
const socket = io(process.env.REACT_APP_BACKEND_URL!);

const initialState: Array<Message> = [];

enum ActionType {
  ADD_MESSAGE = "ADD_MESSAGE",
  SET_MESSAGES = "SET_MESSAGES",
}
type AddMessageAction = {
  type: ActionType.ADD_MESSAGE;
  payload: Message;
};
type SetMessagesAction = {
  type: ActionType.SET_MESSAGES;
  payload: Array<Message>;
};
type Action = AddMessageAction | SetMessagesAction;

const reducer: Reducer<Array<Message>, Action> = (messages, action) => {
  switch (action.type) {
    case ActionType.ADD_MESSAGE:
      const newState = [...messages, action.payload];
      localForage.setItem(action.payload.chatId, newState);
      return newState;
    case ActionType.SET_MESSAGES:
      return action.payload;
    default:
      return messages;
  }
};

export const MessageList: React.FC<Props> = ({ chatId, userId }) => {
  const [messages, dispatch] = useReducer(reducer, initialState);

  const onNewMessage = useCallback(
    (message: string) => {
      if (message) {
        const newMessage: Message = JSON.parse(message);
        if (newMessage.chatId === chatId) {
          dispatch({ type: ActionType.ADD_MESSAGE, payload: newMessage });
        }
      }
    },
    [chatId]
  );
  useEffect(() => {
    socket.on("income message", onNewMessage);

    return () => {
      socket.off("income message", onNewMessage);
    };
  }, [onNewMessage]);
  useEffect(() => {
    if (chatId)
      localForage
        .getItem<Array<Message> | undefined>(chatId)
        .then((messages) => {
          if (!messages) throw new Error("no chat messages");

          dispatch({ type: ActionType.SET_MESSAGES, payload: messages });
        })
        .catch(() => dispatch({ type: ActionType.SET_MESSAGES, payload: [] }));
  }, [chatId]);

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <MessageView
          message={message}
          currentUserId={userId}
          key={message?.id}
        />
      ))}
    </div>
  );
};
