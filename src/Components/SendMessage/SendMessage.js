import React, { useState } from "react";
import { auth, db } from "../../Config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { SendOutlined } from "@ant-design/icons";

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    if (!msg) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Message cannot be empty!",
      });
      return;
    } else {
      addDoc(collection(db, "messages"), {
        uid,
        photoURL,
        text: msg,
        createdAt: serverTimestamp(),
      });
      setMsg("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="send-message-div">
      <form className="send-message-form" onSubmit={formSubmitHandler}>
        <input
          className="input-field"
          placeholder="Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="send-message-btn">
          <SendOutlined />
        </button>
      </form>
    </div>
  );
}

export default SendMessage;
