import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import ErrorPage from "./page/error";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Anotherpage from "./page/Anotherpage";

import './index.css'

const App = () => {
  const [userEmail, setUserEmail] = useState('');

  const sendEmailToParent = (email) => {
    setUserEmail(email);
  };

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home userEmail={userEmail} sendEmailToParent={sendEmailToParent} />}
          />
          <Route path="/signup" element={<Signup sendEmailToParent={sendEmailToParent}/>} />
          <Route
            path="/login"
            element={<Login sendEmailToParent={sendEmailToParent} />}
          />
          <Route path="/x" element={<Anotherpage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
