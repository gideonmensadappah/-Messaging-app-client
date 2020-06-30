import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { AvatarDropDown } from "./dropDown/dropDown";
import "./navbarHeader.css";

const useStyles = makeStyles({
  header: {
    background: "#2196f3",
  },
  toolBar: {
    justifyContent: "space-between",
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
          <AvatarDropDown />
        </Toolbar>
      </AppBar>
    </>
  );
};
