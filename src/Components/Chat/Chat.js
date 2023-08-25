import React, { useEffect, useState, useRef } from "react";
import SignOut from "../SignOut/SignOut";
import { auth, db } from "../../Config/firebase";
import SendMessage from "../SendMessage/SendMessage";
import { collection, getDocs, orderBy } from "firebase/firestore";

function Chat() {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const [x,setX] = useState(false);
  const getData = async () => {
    await getDocs(collection(db, "messages"), orderBy("createdAt", "desc")).then(
      (querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return data;
        });

        const sortedMessages = messagesData.sort((a, b) => a.createdAt - b.createdAt);
        setMessages(sortedMessages);
      }
    );
  };
  useEffect(() => {
    getData();
  },[x]);

  // if (loader) {
  //   return (
  //     <>
  //       <div className="loader-container">
  //         <div className="spinner"></div>
  //       </div>
  //     </>
  //   );
  // }
  return (
    <>
      <SignOut />
      <div className="container chat-div">
        <div className="chat-container">  
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
        </div>
        {/* <div className="chat-container">
        <div className="hello">
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
        </div>
        <div className="hello">
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
        </div>
        <div className="hello">
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
        </div>
        </div> */}
        <SendMessage setX={setX} scroll={scroll} />
        <div ref={scroll}></div>
      </div>
    </>
  );
}

export default Chat;
