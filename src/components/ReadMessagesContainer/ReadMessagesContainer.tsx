import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";
import "./ReadMessages.css";
type Props = {};
const useStyle = makeStyles({
  avatar: {
    backgroundColor: "#adc852",
  },
});

export const ReadMessagesContainer: React.FC<Props> = (Props) => {
  const classes = useStyle();

  return (
    <>
      <div className="chat-Messages">
        <div className="user-one">
          <div className="user-one-text-container">
            <div className="user-message">
              <p>Some messages...</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                nulla nisi a, magni fugit commodi sed praesentium sunt nemo
                sapiente, neque pariatur placeat expedita laborum corporis
                delectus
              </p>
            </div>
          </div>
        </div>
        {Array.from({ length: 5 }, () => (
          <div className="message-container">
            <div className="user-avatar">
              <Avatar className={classes.avatar}>H</Avatar>
            </div>
            <div className="text-container">
              <div className="user-message">
                <p>Some messages...</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  nulla nisi a, magni fugit commodi sed praesentium sunt nemo
                  sapiente, neque pariatur placeat expedita laborum corporis
                  delectus
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="user-one">
          <div className="user-one-text-container">
            <div className="user-message">
              <p>Some messages...</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                nulla nisi a, magni fugit commodi sed praesentium sunt nemo
                sapiente, neque pariatur placeat expedita laborum corporis
                delectus
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
