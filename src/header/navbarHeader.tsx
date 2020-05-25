import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

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
type Props = {};
export const Header: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.header} position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6">Messaging</Typography>
          <Avatar className={classes.avatar}>H</Avatar>
        </Toolbar>
      </AppBar>
    </>
  );
};
