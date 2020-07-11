import React, { useEffect, useState, useCallback } from "react";
import cc from "classnames";
import {
  getCurrentUserMessagesAsync,
  createNewChatAsync,
  ChatPayload,
  Chat,
} from "../../../functionsHelpers/myFunctions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { SideBarItem } from "./sidebarItem";
import "./sideBar.css";

type Props = {
  contactName: string;
  lastMessage: string;
  currentUserId: string;
  setUserChatId: (id: string) => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      color: "#2196f3",
    },
  },
}));

export const SideBar: React.FC<Props> = ({
  currentUserId,
  lastMessage,
  contactName,
  setUserChatId,
}) => {
  const classes = useStyles();
  const [chatsList, setChatsList] = useState<Array<Chat> | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  let getMessagesList = useCallback((currentUserId: string) => {
    getCurrentUserMessagesAsync(currentUserId).then((chats: Array<Chat>) => {
      setChatsList(chats);
    });
  }, []);

  const getChatId = (chatId: string) => {
    setChatId(chatId);
  };
  useEffect(() => {
    if (chatId) setUserChatId(chatId);
  }, [chatId, setUserChatId]);

  useEffect(() => getMessagesList(currentUserId), [
    getMessagesList,
    currentUserId,
  ]);

  const createNewChat = useCallback(() => {
    const payload: ChatPayload = {
      currentUserId,
      requestedUserId: "2",
    };
    createNewChatAsync(payload).then((chatId) => console.log(chatId));
  }, [currentUserId]);

  return (
    <div className="container-list">
      <div className={cc("create-chat-btn", classes.root)}>
        <Button onClick={createNewChat}>Create Chat</Button>
      </div>
      {chatsList?.length
        ? chatsList?.map((chat) => (
            <SideBarItem
              chat={chat}
              getChatId={getChatId}
              key={chat._id}
              chatId={chat._id}
              contactName={contactName}
              lastMessage={lastMessage}
            />
          ))
        : "No Chats!"}
    </div>
  );
};
