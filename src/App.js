import "./App.css";
import SignIn from "./Components/SignIn/SignIn";
import Chat from "./Components/Chat/Chat";
import { auth } from "./Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function App() {
  const [user] = useAuthState(auth);
  return <>{user ? <Chat></Chat> : <SignIn></SignIn>}</>;
}

export default App;
