import React, { useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import {
  Chat,
  getChat,
  deleteChat,
} from "../../../functionsHelpers/myFunctions";
import "./sideBarItem.css";

type Props = {
  contactName: string;
  lastMessage: string;
  chatId: string;
  setChatId: (chatId: string) => void;
};

const useStyle = makeStyles({
  avatar: {
    backgroundColor: "#adc852",
  },
});

export const SideBarItem: React.FC<Props> = ({
  contactName,
  lastMessage,
  chatId,
  setChatId,
}) => {
  const classes = useStyle();

  const handleClick = useCallback(
    (_) => {
      setChatId(chatId);
    },
    [setChatId, chatId]
  );
  const handleDelete = useCallback(
    (_) => {
      deleteChat(chatId).then((res) => console.log(res));
    },
    [chatId]
  );
  return (
    <div className="message" onClick={handleClick}>
      <div className="details">
        <Avatar className={classes.avatar}>H</Avatar>
        <div className="metadata">
          <div className="user-name">{contactName}</div>
          <div className="time">3 minutes ago...</div>
        </div>
        <div className="menu">
          <DeleteIcon onClick={handleDelete} />
        </div>
      </div>
      <div className="message-preview">{lastMessage}</div>
    </div>
  );
};
