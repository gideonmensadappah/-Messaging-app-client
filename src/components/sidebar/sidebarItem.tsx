import React from "react";
import "./sideBarItem.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";
type Props = {
  contactName: string;
  lastMessage: string;
};

const useStyle = makeStyles({
  avatar: {
    backgroundColor: "#adc852",
  },
});

export const SideBarItem: React.FC<Props> = ({ contactName, lastMessage }) => {
  const classes = useStyle();

  return (
    <div className="message">
      <div className="details">
        <Avatar className={classes.avatar}>H</Avatar>
        <div className="metadata">
          <div className="user-name">{contactName}</div>
          <div className="time">3 minutes ago...</div>
        </div>
        <div className="menu">
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <div className="message-preview">{lastMessage}</div>
    </div>
  );
};
