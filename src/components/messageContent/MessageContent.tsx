import React from "react";
import "./messageContent.css";
import { ReadMessagesContainer } from "../ReadMessagesContainer/ReadMessagesContainer";

type Props = {
  message: string;
};

export const MessageContent: React.FC<Props> = ({ message }) => {
  return (
    <>
      <div className="container-box">
        <div className="messages">
          <ReadMessagesContainer />
        </div>
        <div className="rectangle-container">
          <input type="text" className="rectangle-input" />
        </div>
      </div>
    </>
  );
};
