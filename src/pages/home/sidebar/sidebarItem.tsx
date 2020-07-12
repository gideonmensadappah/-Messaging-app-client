import React, { useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import { Chat, getChat } from "../../../functionsHelpers/myFunctions";
import "./sideBarItem.css";

type Props = {
  contactName: string;
  lastMessage: string;
  chat: Chat;
  chatId: string;
  getChatId: (chatId: string) => void;
};

const useStyle = makeStyles({
  avatar: {
    backgroundColor: "#adc852",
  },
});

export const SideBarItem: React.FC<Props> = ({
  contactName,
  lastMessage,
  chat: { _id, usersId },
  chatId,
  getChatId,
}) => {
  const classes = useStyle();

  const handleChatItem = useCallback(
    (event, chatId) => {
      event.preventDefault();
      getChat(chatId).then((chat) => {
        getChatId(chat._id);
      });
    },
    [getChatId]
  );

  return (
    <div className="message" onClick={(event) => handleChatItem(event, chatId)}>
      <div className="details">
        <Avatar className={classes.avatar}>H</Avatar>
        <div className="metadata">
          <div className="user-name">{contactName}</div>
          <div className="time">3 minutes ago...</div>
        </div>
        <div className="menu">
          <DeleteIcon />
        </div>
      </div>
      <div className="message-preview">{lastMessage}</div>
    </div>
  );
};
