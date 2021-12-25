import React from "react";
import "./App.css";
// import Uploader from "./components";
import { Uploader } from "components";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <Uploader />
      </div>
    </SnackbarProvider>
  );
}

export default App;
