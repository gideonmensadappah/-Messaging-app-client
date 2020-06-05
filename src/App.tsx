import React from "react";
import "./App.css";
import { Header } from "./components/header/navbarHeader";
import { SideBar } from "./components/sidebar/sidebarList";
import { MessageContent } from "./components/messageContent/MessageContent";
import {
  styled,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

type Props = {};

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});
const AppContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  flexDirection: "column",
  justifyContent: "flex-start",
});
const Content = styled(Box)({
  display: "flex",
  flex: 1,
  flexDirection: "row",
  alignItems: "stretch",
  overflow: "hidden",
});

const sideBarItem = {
  contactName: "gideon",
  lastMessage: "hello user",
};
const App: React.FC<Props> = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        <Content>
          <SideBar
            contactName={sideBarItem.contactName}
            lastMessage={sideBarItem.lastMessage}
          />
          <MessageContent />
        </Content>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
