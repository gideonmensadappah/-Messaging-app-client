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
  height: "100vh",
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
  overflowY: "auto",
  flexDirection: "column",
  backgroundColor: "rgba(244, 244, 244, 0.9)",
  width: "100%",
  height: "100vh",
});

const sideBarItem = {
  contactName: "gideon",
  lastMessage: "hello user",
};

type State = {
  uid: string;
  chatId: string | null;
};
export default class MessagingHome extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      uid: "",
      chatId: null,
    };
  }
  setUserChatId = (chatId: string) => {
    this.setState({
      chatId,
    });
  };
  componentDidMount() {
    const uid = String(firebase.auth().currentUser?.uid);
    this.setState({
      uid,
    });
  }
  // componentDidUpdate(prevState: State) {
  //   const { chatId } = this.state;
  //   if (chatId !== prevState.chatId) {
  //     if (chatId) this.setUserChatId(chatId);
  //   }
  // }

  render() {
    const { uid, chatId } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header />
          <ContentContainer>
            <SideBar
              setUserChatId={this.setUserChatId}
              currentUserId={uid}
              contactName={sideBarItem.contactName}
              lastMessage={sideBarItem.lastMessage}
            />
            <Content>
              <MessageList chatId={chatId} userId={uid} />
              <MessageInput chatId={chatId} userId={uid} />
            </Content>
          </ContentContainer>
        </AppContainer>
      </ThemeProvider>
    );
  }
}
