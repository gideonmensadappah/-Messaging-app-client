import React, { useCallback } from "react";
import io from "socket.io-client";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";
import { User } from "./newChat";
import { createNewChat, ChatPayload } from "../functionsHelpers/myFunctions";
import style from "./usesList.module.scss";

type Props = {
  suggestion: User;
  currentUserId: string;
  setShowList: () => void;
  resetSuggestionList: () => void;
};
const useStyle = makeStyles({
  avatar: {
    backgroundColor: "#adc852",
  },
});

const socket = io(process.env.REACT_APP_BACKEND_URL!);
export const UsersList: React.FC<Props> = ({
  suggestion: { _id, firstName, lastName, phone },
  currentUserId,
  setShowList,
  resetSuggestionList,
}) => {
  const onUserClicked = useCallback(
    (_, _id, firstName) => {
      const res = globalThis.confirm(
        `Do you want to start chat with ${firstName}`
      );
      const payload: ChatPayload = {
        currentUserId,
        requestedUserId: _id,
      };
      if (res) {
        createNewChat(payload);
        resetSuggestionList();
        setShowList();
        socket.emit("new chat");
      }
    },
    [currentUserId, resetSuggestionList, setShowList]
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
