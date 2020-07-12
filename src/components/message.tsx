import React from "react";
import cn from "classnames";
import styles from "./message.module.scss";
import Avatar from "@material-ui/core/Avatar";

type Props = {
  message: Message;
  currentUserId: string;
};
export type Message = {
  id: string;
  avatar: string;
  userId: string | null;
  chatId: string | null;
  text: string | null;
  createdAt: Date;
};

export const MessageView: React.FC<Props> = ({
  message: { id, userId, chatId, avatar, text, createdAt },
  currentUserId,
}) => {
  const isOwnMessage = userId === currentUserId;
  return (
    <div
      className={cn(
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.userMessage
      )}
    >
      {!isOwnMessage ? <Avatar className={styles.avatar} src={avatar} /> : null}
      <div className={styles.message}>{text}</div>
    </div>
  );
};
