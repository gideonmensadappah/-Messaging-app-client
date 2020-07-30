import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { getAutoCompleteUsersList } from "../functionsHelpers/myFunctions";
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
type UserInput = string | null;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      padding: "10px",
    },
  },
}));

const NewChat: React.FC<Props> = ({ setShowList, currentUserId }) => {
  const classes = useStyles();
  const [suggestions, setSuggestion] = useState<Array<User>>([]);
  const [userInput, setUserInput] = useState<UserInput>(null);

  const handleOnKeyUp = useCallback((event: any) => {
    event.target.value ? setUserInput(event.target.value) : setUserInput(null);
  }, []);
  const resetSuggestionList = useCallback(() => {
    setSuggestion([]);
  }, [setSuggestion]);

  useEffect(() => {
    if (userInput) {
      getAutoCompleteUsersList(userInput).then((users) => {
        const filterSuggestionList = users.filter(
          (user: User) => user._id !== currentUserId
        );
        setSuggestion(filterSuggestionList);
      });
    } else {
      setSuggestion([]);
    }
  }, [userInput, currentUserId]);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          onKeyUp={handleOnKeyUp}
          id="standard-search"
          label="Search..."
          variant="filled"
        ></TextField>
      </div>
      {suggestions
        ? suggestions.map((suggestion) => (
            <UsersList
              key={suggestion._id}
              setShowList={setShowList}
              currentUserId={currentUserId}
              suggestion={suggestion}
              resetSuggestionList={resetSuggestionList}
            />
          ))
        : null}
    </form>
  );
};

export default NewChat;
