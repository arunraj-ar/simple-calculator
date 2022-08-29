import React from "react";
import BackgroundCard from "./components/Layout/BackgroundCard";
import Keypad from "./components/Layout/Keypad";
import Screen from "./components/Layout/Screen";
import InputProvider from "./store/InputProvider";

function App() {
  return (
    <BackgroundCard>
      <InputProvider>
        <Screen />
        <Keypad />
      </InputProvider>
    </BackgroundCard>
  );
}

export default App;
