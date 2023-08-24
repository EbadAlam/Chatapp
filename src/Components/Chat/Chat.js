import React, { useEffect, useState, useRef } from "react";
import SignOut from "../SignOut/SignOut";
import { auth, db } from "../../Config/firebase";
import SendMessage from "../SendMessage/SendMessage";
import { collection, getDocs, orderBy } from "firebase/firestore";

function Chat() {
  const scroll = useRef();
  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  const getData = async () => {
    setLoader(true);
    // const citiesRef = collection(db, "messages");
    // const q = await getDocs(citiesRef, orderBy("createdAt", "desc"));
    // const h = q.docs.map((doc) => doc.data());
    // setMessages(h);
    // console.log(h, "data");
    // getDocs(collection(db, "messages"), orderBy("createdAt", "desc")).then(
    //   (QuerySnapshot) => {
    //     setMessages(QuerySnapshot.docs.map((doc) => doc.data()));
    //   }
    // );
    getDocs(collection(db, "messages"), orderBy("createdAt", "desc")).then(
      (querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // console.log(data.createdAt.toDate());
          data.createdAt = data.createdAt.toDate();
          return data;
        });

        const sortedMessages = messagesData.sort((a, b) => a.createdAt - b.createdAt);

        setMessages(sortedMessages);
      }
    );
    setLoader(false);
  };
  useEffect(() => {
    getData();
  }, []);

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
        {messages.map(({ text, photoURL, uid }) => {
          // console.log(createdAt, "time");
          return (
            <div className="hello">
              <div
                className={`message ${uid === auth.currentUser.uid ? "sent" : "receive"
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
        })}
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
