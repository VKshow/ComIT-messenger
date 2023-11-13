import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./page/error";
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

const router = createBrowserRouter([
  { path: "/", element: <Home userEmail={userEmail} sendEmailToParent={sendEmailToParent} />, errorElement: <ErrorPage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login sendEmailToParent={sendEmailToParent} /> },
  { path: "/x", element: <Anotherpage /> },
]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} sendEmailToParent={sendEmailToParent} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
