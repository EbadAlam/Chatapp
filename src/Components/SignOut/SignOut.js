import React from "react";
import { auth } from "../../Config/firebase";

function SignOut() {
  return (
    <div className="sign-out-div">
      <button className="sign-out-btn" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    </div>
  );
}

export default SignOut;
