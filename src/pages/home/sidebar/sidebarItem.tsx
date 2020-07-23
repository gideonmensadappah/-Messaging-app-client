import React, { useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import { deleteChat, ChatList } from "../../../functionsHelpers/myFunctions";
import "./sideBarItem.css";

type Props = {
  chatId: string;
  setChatId: (chatId: string) => void;
  chatList: Array<ChatList>;
  userFirstName: string;
  userLastName: string;
};

const useStyle = makeStyles({
  avatar: {
    backgroundColor: "#adc852",
  },
  details: {
    cursor: "pointer",
  },
});

export const SideBarItem: React.FC<Props> = ({
  chatId,
  setChatId,
  chatList,
  userFirstName,
  userLastName,
}) => {
  const classes = useStyle();

  const handleClick = useCallback(
    (_) => {
      setChatId(chatId);
    },
    [setChatId, chatId]
  );
  const handleDelete = useCallback(
    async (_) => {
      const id = chatList.findIndex((chats) => chats._id === chatId);
      chatList.splice(id, 1);
      await deleteChat(chatId);
    },
    [chatId, chatList]
  );
  return (
    <div className="message" onClick={handleClick}>
      <div className={classes.details}>
        <Avatar className={classes.avatar}>H</Avatar>
        <div className="metadata">
          <div className="user-name">{userFirstName}</div>
          <div className="time">3 minutes ago...</div>
        </div>
        <div className="menu">
          <DeleteIcon onClick={handleDelete} />
        </div>
      </div>
      <div className="message-preview">{userLastName}</div>
    </div>
  );
};
