// src/App.jsx
import React from "react";
import FeedbackFab from "./components/FeedbackFab/FeedbackFab";
import { FeedbackProvider } from "./context/FeedbackContext";
import "./styles/globals.css";

function App() {
  return (
    <FeedbackProvider>
      <div className="App">
        <FeedbackFab />
      </div>
    </FeedbackProvider>
  );
}

export default App;
