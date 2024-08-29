import React from "react";
import AutoComplete from "./components/AutoComplete";
import "./styles/AutoComplete.css";
import "./App.css";

const App: React.FC = () => {
   const handleSelection = (item: string) => {
    console.log("Selected item:", item);
  };
  return (
    <div>
      <h1 className="title">React TypeScript AutoComplete</h1>
      <AutoComplete placeholder="Search for a fruit..." onSelect={handleSelection} />
    </div>
  );
};

export default App;
