import { useState } from "react";
import "./App.css";
import SignIn from "./Components/SignIn/SignIn";
import Chat from "./Components/Chat/Chat";
import { auth } from "./Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function App() {
  // const [loader, setLoader] = useState(false);

  const [user] = useAuthState(auth);
  // if (loader) {
  //   return (
  //     <>
  //       <div className="loader-container">
  //         <div className="spinner"></div>
  //       </div>
  //     </>
  //   );
  // }
  return <>{user ? <Chat></Chat> : <SignIn></SignIn>}</>;
}

export default App;
