import React, { useEffect, useState, useCallback } from "react";
import cc from "classnames";
import {
  getCurrentUserChats,
  ChatList,
} from "../../../functionsHelpers/myFunctions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { SideBarItem } from "./sidebarItem";
import NewChat from "../../../components/newChat";
import "./sideBar.css";

type Props = {
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
  button: {
    paddingLeft: "25%",
  },
}));

export const SideBar: React.FC<Props> = ({
  currentUserId,
  setCurrentChatId,
  currentChatId,
}) => {
  const classes = useStyles();
  const [chatList, setChatList] = useState<Array<ChatList> | null>(null);
  const [shouldShowList, setShowList] = useState(true);

  const toggleList = useCallback(() => {
    setShowList(!shouldShowList);
  }, [shouldShowList]);

  const showList = useCallback(() => {
    setShowList(true);
  }, []);

  useEffect(() => {
    if (currentUserId && shouldShowList) {
      getCurrentUserChats(currentUserId).then((chats) => {
        console.log(chats);
        setChatList(chats);
      });
    }
  }, [currentUserId, shouldShowList]);

  return (
    <div className="container-list">
      <div className={cc("create-chat-btn", classes.root)}>
        <Button className={classes.button} onClick={toggleList}>
          {!shouldShowList ? "Show list" : "Create chat"}
        </Button>
      </div>
      {shouldShowList ? (
        chatList?.map((chat) =>
          chat.chatsdetails.map((details) => (
            <SideBarItem
              key={chat._id}
              setChatId={setCurrentChatId}
              chatId={chat._id}
              chatList={chatList}
              userFirstName={details.firstName}
              userLastName={details.lastName}
            />
          ))
        )
      ) : (
        <NewChat setShowList={showList} currentUserId={currentUserId} />
      )}
    </div>
  );
};
