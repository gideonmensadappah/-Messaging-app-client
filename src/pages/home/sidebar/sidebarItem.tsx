import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import { ChatList } from "../../../functionsHelpers/myFunctions";
import { makeStyles } from "@material-ui/styles";
import "./sideBarItem.css";

interface Props {
  chatId: string;
  setChatId: (chatId: string) => void;
  chatList: Array<ChatList>;
  userFirstName: string;
  userLastName: string;
  avatar: string;
}

const useStyle = makeStyles({
  avatar: {
    backgroundColor: "#adc852",
  },
  details: {
    cursor: "pointer",
  },
});

const SideBarItem: React.FC<Props> = ({
  chatId,
  setChatId,
  userFirstName,
  userLastName,
  avatar,
}) => {
  const classes = useStyle();
  const handleClick = useCallback(
    (_) => {
      setChatId(chatId);
    },
    [setChatId, chatId]
  );

  return (
    <div className="message" onClick={handleClick}>
      <div className={classes.details}>
        {avatar !== "" ? (
          <Avatar src={avatar} alt="sd" className={classes.avatar} />
        ) : (
          <Avatar alt="sd" className={classes.avatar}>
            {userFirstName}
          </Avatar>
        )}

        <div className="metadata">
          <div className="user-name">{userFirstName}</div>
          <div className="time">3 minutes ago...</div>
        </div>
        <div className="menu">
          <Link to="/update">
            <SettingsIcon />
          </Link>
        </div>
      </div>
      <div className="message-preview">{userLastName}</div>
    </div>
  );
};

export default SideBarItem;
