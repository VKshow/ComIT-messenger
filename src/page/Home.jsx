import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useCheckAuth } from "../hooks";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../firebase";

export default function Home({ userEmail }) {
  useCheckAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //from todo

  const [message, setMessage] = useState("");
  const [messageText, setMessageText] = useState([]);

  const addMessage = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "messageText"), {
        userEmail: userEmail,
        message: message,
      });

      setMessageText((prevMessages) => [
        ...prevMessages,
        { userEmail: userEmail, message: message, id: docRef.id },
      ]);

      setMessage("");

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchPost = async () => {
    await getDocs(collection(db, "messageText")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessageText(newData);
      console.log(messageText, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  //finish from todo



  return (
    <>
      <section className="chat__section">
      <h1 className="header">Leave your message</h1>
        <div className="message__window">
          

          <div>
            <div className="todo-content">
              {messageText?.map((message, i) => {
                const atIndex = message.userEmail.indexOf("@");
                const userName = atIndex !== -1 ? message.userEmail.slice(0, atIndex) : message.userEmail;

                return (
                  <p key={i}>
                    <strong>{userName}:</strong> {message.message}
                  </p>
                );
              })}
            </div>

            
          </div>
        </div>
        <div>
            <div>
              <input
                type="text"
                placeholder={`${userEmail.split('@')[0]} enter your message`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="btn-container">
              <button type="submit" className="btn" onClick={addMessage}>
                Submit
              </button>
            </div>
            </div>
      </section>
      <div>
        <button onClick={handleLogout}> Logout </button>
      </div>
    </>
  );
}
