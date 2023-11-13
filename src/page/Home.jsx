import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useCheckAuth } from "../hooks";
import { useState, useEffect, useRef } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home({ userEmail }) {
  useCheckAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messageText, setMessageText] = useState([]);
  const messagesEndRef = useRef(null);

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
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messageText"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessageText(newData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchPost();
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageText]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="chat__section">
        <div className="chat-header">
          <div className="header-img">
            <img src="data:image/png;base64,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" alt="logo" />
          </div>

          <h1 className="header">Leave your message</h1>
          <div>
        <button className="logout-btn" onClick={handleLogout}> Logout </button>
      </div>
        </div>
        
        <div className="message__window">
          <div className="message__content">
            {messageText?.map((message, i) => {
              const atIndex = message.userEmail.indexOf("@");
              const userName =
                atIndex !== -1
                  ? message.userEmail.slice(0, atIndex)
                  : message.userEmail;

              return (
                <div className="message" key={i}>
                  <div className="message__ava">
                    <img
                      src="https://www.svgrepo.com/show/58873/male-user-shadow.svg"
                      alt="ava"
                    />
                    <div className="nickname">
                      <strong>{userName}:</strong>
                    </div>
                  </div>
                  <div className="message__text">{message.message}</div>
                </div>
              );
            })}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
        <div>
          <div>
            <input className="message__input"
              type="text"
              placeholder={`${userEmail.split('@')[0]} enter your message`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn message__btn" onClick={addMessage}>
              Submit
            </button>
          </div>
        </div>
      </section>
      
    </>
  );
}
