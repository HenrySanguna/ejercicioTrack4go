import React from "react";
import "./App.css";

import Users from "./components/users";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container p-4">
      <div className="row">
        <Users />
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
