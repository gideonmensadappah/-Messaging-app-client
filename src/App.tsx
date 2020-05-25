import React from "react";
import "./App.css";
import { Header } from "./header/navbarHeader";
type Props = {};

const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default App;
