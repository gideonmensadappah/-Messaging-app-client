import React from "react";
import "./messageContent.css";
type Props = {};

export const MessageContent: React.FC<Props> = (Props) => {
  return (
    <>
      <div className="container-box">
        <div className="messages">message message</div>
        <div className="rectangle-container">
          <input type="text" className="rectangle-input" />
        </div>
      </div>
    </>
  );
};
