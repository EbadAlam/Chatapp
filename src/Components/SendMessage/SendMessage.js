import React, { useState } from "react";
import { auth, db } from "../../Config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
function SendMessage() {
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
    }
  };
  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <input
          placeholder="Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default SendMessage;
