import React, { useEffect, useState, useCallback } from "react";
import "./sideBar.css";
import { SideBarItem } from "./sidebarItem";
import cc from "classnames";
import {
  getCurrentUserMessagesAsync,
  createNewChatAsync,
  ChatPayload,
  Chat,
} from "../../functionsHelpers/myFunctions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

type Props = {
  contactName: string;
  lastMessage: string;
  currentUserId: string;
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
}) => {
  const classes = useStyles();
  const [chatsList, setChatsList] = useState<Array<Chat> | null>(null);

  useEffect(() => {
    getCurrentUserMessagesAsync(currentUserId).then((chats) => {
      setChatsList(chats);
    });
  }, [chatsList, currentUserId]);

  const createNewChat = useCallback(() => {
    const payload: ChatPayload = {
      currentUserId: currentUserId,
      requestedUserId: "2",
    };
    createNewChatAsync(payload).then((chatId) => console.log(chatId));
  }, [currentUserId]);

  return (
    <div className="container-list">
      {chatsList?.length
        ? Array.from({ length: chatsList.length }, () => (
            <SideBarItem contactName={contactName} lastMessage={lastMessage} />
          ))
        : "No Chats!"}

      <div className={cc("create-chat-btn", classes.root)}>
        <Button onClick={createNewChat}>Create Chat</Button>
      </div>
    </div>
  );
};
