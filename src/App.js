import React from "react";
import "./App.css";
import Weather from "./components/Weather";
import MyNav from "./components/MyNav";

function App() {
  return (
    <>
      <header className="App App-header">
        <MyNav />
      </header>
      <main>
        <Weather />
      </main>
    </>
  );
}

export default App;
