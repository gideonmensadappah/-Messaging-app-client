import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

type Props = {};

const useStyles = makeStyles({
  header: {
    background: "#2196f3",
  },
  toolBar: {
    justifyContent: "space-between",
  },
  avatar: {
    background: "#e10050",
  },
});

const App: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar className={classes.header} position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6">Messaging</Typography>
          <Avatar className={classes.avatar}>H</Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default App;
