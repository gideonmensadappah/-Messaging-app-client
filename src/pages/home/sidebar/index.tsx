import React, { useEffect, useState, useCallback } from "react";
import cc from "classnames";
import {
  getCurrentUserMessagesAsync,
  Chat,
} from "../../../functionsHelpers/myFunctions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { SideBarItem } from "./sidebarItem";
import NewChat from "../../../components/newChat";
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
  const [showList, setShowList] = useState(true);
  const [text, setText] = useState("CREATE CHAT");

  const getMessagesList = useCallback((currentUserId: string) => {
    getCurrentUserMessagesAsync(currentUserId).then((chats: Array<Chat>) => {
      setChatsList(chats);
    });
  }, []);

  const getChatId = useCallback((chatId: string) => {
    console.log(chatId);
    setChatId(chatId);
  }, []);

  const createNewChatButton = useCallback(() => {
    if (showList) {
      setShowList(false);
      setText("CHAT LIST");
    } else {
      setShowList(true);
      setText("CREATE CHAT");
    }
  }, [showList]);
  const returnChatList = useCallback(() => {
    setShowList(true);
  }, []);
  useEffect(() => {
    if (chatId) setUserChatId(chatId);
    getMessagesList(currentUserId);
  }, [chatId, setUserChatId, getMessagesList, currentUserId]);

  const isAvailable = chatsList?.length && showList;
  return (
    <div className="container-list">
      <div className={cc("create-chat-btn", classes.root)}>
        <Button onClick={createNewChatButton}>{text}</Button>
      </div>
      {isAvailable ? (
        chatsList?.map((chat) => (
          <SideBarItem
            chat={chat}
            getChatId={getChatId}
            key={chat._id}
            chatId={chat._id}
            contactName={contactName}
            lastMessage={lastMessage}
          />
        ))
      ) : (
        <NewChat setShowList={returnChatList} currentUserId={currentUserId} />
      )}
    </div>
  );
};
