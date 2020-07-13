import React, { useEffect, useState, useCallback } from "react";
import cc from "classnames";
import {
  getCurrentUserChats,
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
  setCurrentChatId: (id: string) => void;
  currentChatId: string | null;
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
  setCurrentChatId,
  currentChatId,
}) => {
  const classes = useStyles();
  const [chatList, setChatList] = useState<Array<Chat> | null>(null);
  const [shouldShowList, setShowList] = useState(true);

  const toggleList = useCallback(() => {
    setShowList(!shouldShowList);
  }, [shouldShowList]);

  const showList = useCallback(() => {
    setShowList(true);
  }, []);

  useEffect(() => {
    if (currentUserId && shouldShowList) {
      getCurrentUserChats(currentUserId).then((chats) => setChatList(chats));
    }
  }, [currentUserId, shouldShowList]);

  return (
    <div className="container-list">
      <div className={cc("create-chat-btn", classes.root)}>
        <Button onClick={toggleList}>
          {!shouldShowList ? "Show list" : "Create chat"}
        </Button>
      </div>
      {shouldShowList ? (
        chatList?.map((chat) => (
          <SideBarItem
            setChatId={setCurrentChatId}
            key={chat._id}
            chatId={chat._id}
            chatList={chatList}
            contactName={contactName}
            lastMessage={lastMessage}
          />
        ))
      ) : (
        <NewChat setShowList={showList} currentUserId={currentUserId} />
      )}
    </div>
  );
};
