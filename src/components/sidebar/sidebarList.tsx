import React from "react";
import "./sideBar.css";
import { SideBarItem } from "./sidebarItem";

type Props = {
  contactName: string;
  lastMessage: string;
};

export const SideBar: React.FC<Props> = ({ lastMessage, contactName }) => {
  return (
    <div className="container">
      {Array.from({ length: 20 }, () => (
        <SideBarItem contactName={contactName} lastMessage={lastMessage} />
      ))}
    </div>
  );
};
