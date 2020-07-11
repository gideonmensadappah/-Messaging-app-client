import React, { useEffect, useReducer, Reducer, useCallback } from "react";
import io from "socket.io-client";
import { MessageView, Message } from "../../../components/message";
import "./index.css";

type Props = {
  userId: string;
  chatId: string | null;
};
const socket = io("http://localhost:5000");

const initialState: Array<Message> = [];

enum ActionType {
  ADD_MESSAGE = "ADD_MESSAGE",
}
type Action = {
  type: ActionType;
  payload: Message;
};

const reducer: Reducer<Array<Message>, Action> = (messages, action) => {
  switch (action.type) {
    case ActionType.ADD_MESSAGE:
      return [...messages, action.payload];
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
