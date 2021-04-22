import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App";
import AuthState from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <AuthState>
      <App />
      </AuthState>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
