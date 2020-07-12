import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { getUsersList } from "../functionsHelpers/myFunctions";
import { UsersList } from "./usersList";
type Props = {
  currentUserId: string;
  setShowList: () => void;
};
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
};
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
type UserInput = string | null;
const NewChat: React.FC<Props> = ({ setShowList, currentUserId }) => {
  const classes = useStyles();
  const [suggestions, setSuggestion] = useState<Array<User>>([]);
  const [userInput, setUserInput] = useState<UserInput>(null);

  const handleOnKeyUp = useCallback((event: any) => {
    event.target.value ? setUserInput(event.target.value) : setUserInput(null);
  }, []);

  useEffect(() => {
    if (userInput) {
      getUsersList(userInput).then((users) => {
        setSuggestion(users);
      });
    } else {
      setSuggestion([]);
    }
  }, [userInput]);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          onKeyUp={handleOnKeyUp}
          type="search"
          id="standard-search"
          label="Search by name"
        ></TextField>
      </div>
      {suggestions
        ? suggestions.map((suggestion) => (
            <UsersList
              key={suggestion._id}
              setShowList={setShowList}
              currentUserId={currentUserId}
              suggestion={suggestion}
            />
          ))
        : null}
    </form>
  );
};

export default NewChat;
