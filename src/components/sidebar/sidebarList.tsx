import React, { useEffect, useState } from "react";
import "./sideBar.css";
import { SideBarItem } from "./sidebarItem";
import { getCurrentUserMessagesAsync } from "../../functionsHelpers/myFunctions";
type Props = {
  contactName: string;
  lastMessage: string;
};

type chatsState = {
  _id: string;
  usersId: Array<string>;
  length: number;
};

export const SideBar: React.FC<Props> = ({ lastMessage, contactName }) => {
  const [chatsList, setChatsList] = useState<chatsState>();
  const [length, setLength] = useState<number | any>();
  useEffect(() => {
    getCurrentUserMessagesAsync("24").then((chats: chatsState) => {
      setLength(chats.length);
      setChatsList(chats);
    });
  }, []);
  return (
    <div className="container">
      {chatsList?.length
        ? Array.from({ length: length }, () => (
            <SideBarItem contactName={contactName} lastMessage={lastMessage} />
          ))
        : "No Chats!"}
    </div>
  );
};
