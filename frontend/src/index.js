import React from "react";
import ReactDOM from "react-dom/client"; // A importação correta para React 18+
import App from "./App";

// Usando createRoot ao invés de ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

