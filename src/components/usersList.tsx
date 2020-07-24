import React, { useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";
import { User } from "./newChat";
import { createNewChat, ChatPayload } from "../functionsHelpers/myFunctions";
import style from "./usesList.module.scss";

type Props = {
  suggestion: User;
  currentUserId: string;
  setShowList: () => void;
};
const useStyle = makeStyles({
  avatar: {
    backgroundColor: "#adc852",
  },
});
export const UsersList: React.FC<Props> = ({
  suggestion: { _id, firstName, lastName, phone },
  currentUserId,
  setShowList,
}) => {
  const onUserClicked = useCallback(
    (event, _id, firstName) => {
      const res = globalThis.confirm(
        `Do you want to start chat with ${firstName}`
      );
      if (res) {
        const payload: ChatPayload = {
          currentUserId,
          requestedUserId: _id,
        };
        createNewChat(payload);
        setShowList();
      }
    },
    [currentUserId, setShowList]
  );
  const classes = useStyle();
  return (
    <div
      className="message"
      onClick={(event) => onUserClicked(event, _id, firstName)}
    >
      <div className={style.details}>
        <Avatar className={classes.avatar}>H</Avatar>
        <div className="user-details">
          <div className="user-name">{firstName}</div>
          <div className="message-preview">{lastName + " " + phone}</div>
        </div>
      </div>
    </div>
  );
};
