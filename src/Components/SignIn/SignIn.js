import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Config/firebase";
function SignIn() {
  const [loader, setLoader] = useState(false);
  const signInWithGoogle = () => {
    setLoader(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    setLoader(false);
  };
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
    <div className="sign-in-div">
      <button className="sign-in-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
}

export default SignIn;
