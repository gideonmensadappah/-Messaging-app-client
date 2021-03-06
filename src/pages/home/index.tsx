import React, { Component } from "react";
import {
  styled,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import * as firebase from "firebase";
import { Header } from "./header";
import { SideBar } from "./sidebar";
import { MessageList } from "./messageList";
import { MessageInput } from "./messageInput";

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  palette: {
    primary: { main: "#2196f3" },
  },
});
const AppContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});
const ContentContainer = styled(Box)({
  display: "flex",
  flex: 1,
  flexDirection: "row",
  alignItems: "stretch",
  overflow: "hidden",
});

const Content = styled(Box)({
  display: "flex",
  overflowY: "hidden",
  position: "relative",
  flexDirection: "column",
  backgroundColor: "rgba(244, 244, 244, 0.9)",
  width: "100%",
  height: "90vh",
});

type State = {
  uid: string;
  currentChatId: string | null;
};
class MessagingHome extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      uid: "",
      currentChatId: null,
    };
  }
  setCurrentChatId = (currentChatId: string) => {
    this.setState({
      currentChatId,
    });
  };
  componentDidMount() {
    const uid = String(firebase.auth().currentUser?.uid);
    this.setState({
      uid,
    });
  }

  render() {
    const { uid, currentChatId } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header />
          <ContentContainer>
            <SideBar
              currentChatId={currentChatId}
              setCurrentChatId={this.setCurrentChatId}
              currentUserId={uid}
            />
            <Content>
              <MessageList chatId={currentChatId} userId={uid} />
              <MessageInput chatId={currentChatId} userId={uid} />
            </Content>
          </ContentContainer>
        </AppContainer>
      </ThemeProvider>
    );
  }
}

export default MessagingHome;
