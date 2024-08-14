// App.js
import React, { useState } from "react";
import { auth } from "./firebase.config";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const actionCodeSettings = {
    url: "http://localhost:3000/finishSignUp", // The URL to redirect to after email link is clicked
    handleCodeInApp: true,
  };

  const sendSignInLink = () => {
    setLoading(true);
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        setLoading(false);
        toast.success("Sign-in link sent!");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Failed to send sign-in link.");
      });
  };

  const completeSignIn = () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          const token = result.user.getIdToken().then((token) => {
            console.log("Token:", token);
          });
          setUser(result.user);
          window.localStorage.removeItem("emailForSignIn");
          toast.success("Successfully signed in!");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to sign in.");
        });
    }
  };

  React.useEffect(() => {
    completeSignIn();
  }, []);

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            Welcome, {user.email}
          </h2>
        ) : (
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-2 rounded"
            />
            <button
              onClick={sendSignInLink}
              className="p-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Sending..." : "Send Sign-In Link"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
