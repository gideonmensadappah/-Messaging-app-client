import React, { useCallback, useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import Send from "@material-ui/icons/Send";
import io from "socket.io-client";
import unid from "uniqid";
import styles from "./index.module.css";

type Props = {
  userId: string;
  chatId: string | null;
};

const socket = io(process.env.REACT_APP_BACKEND_URL!);
export const MessageInput: React.FC<Props> = ({ chatId, userId }) => {
  const [userInputState, setUserInputState] = useState("");
  const [typing, setTyping] = useState<string | null>(null);
  const [message, setMessage] = useState({
    id: null,
    avatar: null,
    userId: null,
    chatId: null,
    text: null,
    createdAt: new Date(),
  });

  const handleChange = useCallback(
    (event) => {
      socket.emit("typing", "typing...");

      const newMessage = Object.assign({}, message, {
        text: event.target.value,
        userId,
        id: unid(),
        chatId,
      });
      setMessage(newMessage);
      setUserInputState(event.target.value);
      if (!event.target.value) socket.emit("stop typing", "typing stopped");
    },
    [message, chatId, userId]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (message.text) {
        socket.emit("new message", JSON.stringify(message));
        setMessage(Object.assign({}, message, { text: null }));
        setUserInputState("");
        if (userInputState) socket.emit("stop typing", "typing stopped");
      }
    },
    [message, userInputState]
  );

  useEffect(() => {
    socket.on("user typing", (msg: string) => setTyping(msg));
    socket.on("user typing stopped", (msg: string) => setTyping(null));
  });

  return (
    <div className={styles.inputContainer}>
      <span>{typing ? `user is ${typing}` : null}</span>
      <input
        type="text"
        value={userInputState}
        onChange={handleChange}
        placeholder="Write something already :)"
        className={styles.messageInput}
      />
      <Fab onClick={handleSubmit} color="primary" className={styles.sendButton}>
        <Send />
      </Fab>
    </div>
  );
};
