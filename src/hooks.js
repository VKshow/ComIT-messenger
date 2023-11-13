import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

// https://legacy.reactjs.org/docs/hooks-custom.html

export function useCheckAuth() {
  const navigate = useNavigate();
  let loggedIn = false;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("uid", user.uid);
      loggedIn = true;
    } else {
      // User is signed out
      console.log("user is logged out");
      loggedIn = false;
      navigate("/login");
    }
  });

  return loggedIn;
}