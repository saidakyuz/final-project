import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App";
import AuthState from './context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';

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
