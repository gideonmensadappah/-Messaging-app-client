import React, { Component } from "react";
import { Header } from "../header/navbarHeader";
import { SideBar } from "../../components/sidebar/sidebarList";
import { MessageContent } from "../../components/messageContent/MessageContent";
import {
  styled,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

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

const metaDataMessage = {
  message: sideBarItem.lastMessage,
};

export default class MessagingHome extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header />
          <Content>
            <SideBar
              contactName={sideBarItem.contactName}
              lastMessage={sideBarItem.lastMessage}
            />
            <MessageContent message={metaDataMessage.message} />
          </Content>
        </AppContainer>
      </ThemeProvider>
    );
  }
}
