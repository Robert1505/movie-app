import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Movie from "./Movie";

function App() {
  return (
    <div className="App">
      <Movie id="550" />
      <Movie id="100" />
      <Movie id="200" />
    </div>
  );
}

export default App;
