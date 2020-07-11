import React, { useCallback, useState } from "react";
import Fab from "@material-ui/core/Fab";
import Send from "@material-ui/icons/Send";
import io from "socket.io-client";
import unid from "uniqid";
import styles from "./index.module.css";

type Socket = SocketIOClient.Socket | null;
type Props = {
  userId: string;
  chatId: string | null;
};

const socket = io("http://localhost:5000");
export const MessageInput: React.FC<Props> = ({ chatId, userId }) => {
  const [state, setState] = useState("");
  const [message, setMessage] = useState({
    id: null,
    avatar:
      "https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/fbl-ita-seriea-juventus-cagliari-5e141281f00e4a18a8000001.jpg",
    userId: null,
    chatId: null,
    text: null,
    createdAt: new Date(),
  });

  const handleChange = useCallback(
    (event) => {
      const newMessage = Object.assign({}, message, {
        text: event.target.value,
        userId,
        id: unid(),
        chatId,
      });
      setMessage(newMessage);
      setState(event.target.value);
    },
    [message, chatId, userId]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log(chatId);
      socket.emit("new message", JSON.stringify(message));
      setState("");
    },
    [message, chatId]
  );

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={state}
        onChange={handleChange}
        placeholder="Write something already :)"
        className={styles.messageInput}
      />
      <Fab color="primary" className={styles.sendButton}>
        <Send onClick={handleSubmit} />
      </Fab>
    </div>
  );
};
