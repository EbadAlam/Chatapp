import React, { useEffect, useState } from "react";
import SignOut from "../SignOut/SignOut";
import { db } from "../../Config/firebase";
// import { collection, getDocs, limit, orderBy } from "firebase/firestore";
import SendMessage from "../SendMessage/SendMessage";
import { collection, getDocs, limit, orderBy } from "firebase/firestore";

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "messages"), orderBy("createdAt"), limit(20)).then(
      (QuerySnapshot) => {
        setMessages(QuerySnapshot.docs.map((doc) => doc.data()));
      }
    );
  });
  return (
    <div>
      <SignOut />
      {messages.map(({ id, text, photoURL }) => {
        return (
          <div key={id}>
            <img src={photoURL} alt="User" />
            <p>{text}</p>
          </div>
        );
      })}
      <SendMessage />
    </div>
  );
}

export default Chat;
