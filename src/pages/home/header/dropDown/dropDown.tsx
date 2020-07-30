import React, { useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import fire from "../../../../config/fire";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  avatar: {
    background: "#e10050",
    cursor: "pointer",
  },
});

export const AvatarDropDown = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleTooltipClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleTooltipOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const logOutClicked = useCallback(() => fire.auth().signOut(), []);
  const logOut = (
    <Link to="/">
      <Button onClick={logOutClicked}>LogOut</Button>
    </Link>
  );

  return (
    <>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={logOut}
          interactive
        >
          <Avatar
            onClick={handleTooltipOpen}
            id="dropDownProfile"
            className={classes.avatar}
          ></Avatar>
        </Tooltip>
      </ClickAwayListener>
    </>
  );
};
