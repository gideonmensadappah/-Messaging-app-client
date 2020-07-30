import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import cc from "classnames";
import Button from "@material-ui/core/Button";
import SideBarItem from "./sidebarItem";
import NewChat from "../../../components/newChat";
import {
  getCurrentUserChats,
  ChatList,
} from "../../../functionsHelpers/myFunctions";
import { makeStyles } from "@material-ui/core/styles";
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
const socket = io(process.env.REACT_APP_BACKEND_URL!);
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
        setChatList(chats);
      });
    }
    socket.on("new chat", (id: string) => {
      if (id === currentUserId) {
        console.log("new chat!");
        getCurrentUserChats(currentUserId).then((chats) => {
          setChatList(chats);
        });
      }
    });
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
              avatar={details.avatar ? details.avatar : ""}
            />
          ))
        )
      ) : (
        <NewChat setShowList={showList} currentUserId={currentUserId} />
      )}
    </div>
  );
};
