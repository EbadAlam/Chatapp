import React, { useEffect, useState, useRef } from "react";
import SignOut from "../SignOut/SignOut";
import { auth, db } from "../../Config/firebase";
import SendMessage from "../SendMessage/SendMessage";
import { collection, getDocs, limit, orderBy } from "firebase/firestore";

function Chat() {
  const scroll = useRef();
  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setLoader(true);
    getDocs(collection(db, "messages"), orderBy("createdAt")).then(
      (QuerySnapshot) => {
        // setMessages(QuerySnapshot.docs.map((doc) => doc.data()));
        console.log(
          "hello",
          QuerySnapshot.docs.map((doc) => doc.data().text)
        );
      }
    );
    setLoader(false);
  });

  if (loader) {
    return (
      <>
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      </>
    );
  }
  return (
    <>
      <SignOut />
      <div className="container chat-div">
        {/* {messages.map(({ id, text, photoURL, uid }) => {
          return (
            <div key={id} className="hello">
              <div
                className={`message ${
                  uid === auth.currentUser.uid ? "sent" : "receive"
                }`}
              >
                <div className="user-image-div">
                  <img className="user-image" src={photoURL} alt="User" />
                </div>
                <div className="text-div">
                  <p className="text">{text}</p>
                </div>
              </div>
            </div>
          );
        })} */}
        {/* <div className="hello">
          <div className="message sent">
            <div className="user-image-div">
              <img
                className="user-image"
                src="https://dummyimage.com/600x400/000/fff"
                alt="-"
              />
            </div>
            <div className="text-div">
              <p className="text">hello</p>
            </div>
          </div>
        </div>
        <div className="hello">
          <div className="message receive">
            <div className="user-image-div">
              <img
                className="user-image"
                src="https://dummyimage.com/600x400/000/fff"
                alt="-"
              />
            </div>
            <div className="text-div">
              <p className="text">hello</p>
            </div>
          </div>
        </div> */}
        <SendMessage scroll={scroll} />
        <div ref={scroll}></div>
      </div>
    </>
  );
}

export default Chat;
